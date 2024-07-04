import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../../entities/employees';
import { AttendanceRecord } from '../../entities/attendance_records';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>
  ) {}

  async recordEmployeeCheckIn(employeeId: number, checkInTime: string, date: string): Promise<{ message: string }> {
    // Validate if the 'employeeId' exists in the 'employees' table
    const employee = await this.employeeRepository.findOneBy({ id: employeeId });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} does not exist.`);
    }

    // Check if there's already a 'check_in_time' for the 'employeeId' on the current 'date'
    const attendanceRecord = await this.attendanceRecordRepository.findOne({
      where: {
        employee_id: employeeId,
        date: date
      }
    });
    if (attendanceRecord && attendanceRecord.check_in_time) {
      throw new BadRequestException(`Employee with ID ${employeeId} has already checked in on ${date}.`);
    }

    // Validate the 'checkInTime' to ensure it's within the permissible check-in hours
    // Assuming permissible check-in hours are from 08:00 to 10:00
    const checkInHour = parseInt(checkInTime.split(':')[0]);
    if (checkInHour < 8 || checkInHour > 10) {
      throw new BadRequestException(`Check-in is not allowed at ${checkInTime}.`);
    }

    // Insert a new record into the 'attendance_records' table
    const newAttendanceRecord = this.attendanceRecordRepository.create({
      employee_id: employeeId,
      check_in_time: checkInTime,
      date: date
    });
    await this.attendanceRecordRepository.save(newAttendanceRecord);

    // Return a success message
    return { message: `Check-in for employee ID ${employeeId} on ${date} has been recorded.` };
  }
}