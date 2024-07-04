import { Between, FindOneOptions, Repository } from 'typeorm';
import { Employee } from '../../entities/employees';
import { AttendanceRecord } from '../../entities/attendance_records';

export class ValidationUtils {
  static async validateEntityExists(repository: Repository<any>, id: number): Promise<boolean> {
    const entity = await repository.findOne(id);
    return !!entity;
  }

  static async hasCheckedIn(repository: Repository<AttendanceRecord>, employeeId: number, date: Date): Promise<boolean> {
    const record = await repository.findOne({
      where: {
        employee_id: employeeId,
        date: date
      }
    });
    return !!record;
  }

  static validateTimeWithinRange(checkInTime: Date, startTime: string, endTime: string): boolean {
    const start = new Date(checkInTime);
    start.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]), 0);

    const end = new Date(checkInTime);
    end.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]), 0);

    return checkInTime >= start && checkInTime <= end;
  }
}