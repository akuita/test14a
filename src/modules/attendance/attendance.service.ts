import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
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
}