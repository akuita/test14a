import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { serialize } from 'src/utils/transform';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
  ) {}

  async recordEmployeeCheckIn(employeeId: number): Promise<{ message: string }> {
    const permissibleCheckInHours = { start: '08:00', end: '17:00' }; // Assuming these are the permissible check-in hours
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const startTime = permissibleCheckInHours.start.split(':');
    const endTime = permissibleCheckInHours.end.split(':');

    // Check if current time is within permissible check-in hours
    if (
      currentHour < parseInt(startTime[0]) ||
      (currentHour === parseInt(startTime[0]) && currentMinutes < parseInt(startTime[1])) ||
      currentHour > parseInt(endTime[0]) ||
      (currentHour === parseInt(endTime[0]) && currentMinutes > parseInt(endTime[1]))
    ) {
      throw new Error('Check-in is not allowed at this time.');
    }

    // Create a new attendance record
    const attendanceRecord = this.attendanceRepository.create({
      employee_id: employeeId,
      check_in_time: currentTime,
      status: 'checked_in',
    });

    // Save the new attendance record to the database
    await this.attendanceRepository.save(attendanceRecord);

    // Return a success message confirming the check-in
    return { message: 'Check-in was successful.' };
  }
}