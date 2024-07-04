import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { Employee } from 'src/entities/employees';
import { ValidationUtils } from 'src/shared/utils/validation.utils';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async validateNonDuplicateCheckIn(employeeId: number, date: string): Promise<boolean> {
    const existingRecord = await this.attendanceRepository.findOne({
      where: {
        employee_id: employeeId,
        date: date,
        check_in_time: Not(IsNull()),
      },
    });

    if (existingRecord) {
      throw new Error('Employee has already checked in for the day.');
    }

    return true;
  }

  async recordEmployeeCheckIn(recordEmployeeCheckInDto: any): Promise<AttendanceRecord> {
    const { employee_id, check_in_time, date } = recordEmployeeCheckInDto;

    // Validate that the employee exists
    const employeeExists = await ValidationUtils.validateEntityExists(this.employeeRepository, employee_id);
    if (!employeeExists) {
      throw new Error('Employee not found.');
    }

    // Validate non-duplicate check-in
    await this.validateNonDuplicateCheckIn(employee_id, date);

    // Validate permissible check-in hours
    const permissibleStartTime = '08:00:00'; // Example start time
    const permissibleEndTime = '18:00:00'; // Example end time
    const isWithinPermissibleHours = ValidationUtils.validateTimeWithinRange(
      new Date(check_in_time),
      permissibleStartTime,
      permissibleEndTime,
    );
    if (!isWithinPermissibleHours) {
      throw new Error('Check-in is not allowed at this time.');
    }

    // Create and save the new attendance record
    const attendanceRecord = this.attendanceRepository.create({
      employee_id,
      check_in_time,
      date,
    });
    return this.attendanceRepository.save(attendanceRecord);
  }
}