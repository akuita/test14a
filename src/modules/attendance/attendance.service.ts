import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTimeUtil } from 'src/shared/utils/date-time.util';
import { Repository } from 'typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { serialize } from 'src/utils/transform';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
  ) {}

  async recordEmployeeCheckIn(employeeId: number): Promise<{ message: string, check_in_time: string }> {
    const currentTime = new Date();

    // Use DateTimeUtil to check if current time is within permissible check-in hours
    if (!DateTimeUtil.isWithinCheckInHours(currentTime)) {
      throw new Error('Check-in not allowed at this time.');
    }

    // Check if employee is registered and has not checked in today in the database logic here...

    // Create a new attendance record
    const attendanceRecord = this.attendanceRepository.create({
      employee_id: employeeId,
      check_in_time: currentTime,
      status: 'checked_in',
    });

    // Save the new attendance record to the database
    await this.attendanceRepository.save(attendanceRecord);

    // Return a success message confirming the check-in
    return {
      message: 'Check-in successful.',
      check_in_time: currentTime.toISOString(),
    };
  }
}