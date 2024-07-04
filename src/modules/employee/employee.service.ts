import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/entities/employees';
import { AttendanceRecord } from 'src/entities/attendance_records';
import * as dayjs from 'dayjs';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
  ) {}

  async validateEmployeeCheckIn(employeeId: number): Promise<{ isValid: boolean; message?: string }> {
    const employee = await this.employeeRepository.findOneBy({ id: employeeId });
    if (!employee) {
      return { isValid: false, message: 'Employee is not registered.' };
    }

    const today = dayjs().startOf('day');
    const checkInRecord = await this.attendanceRecordRepository.findOne({
      where: {
        employee_id: employeeId,
        check_in_time: dayjs(today).format('YYYY-MM-DD'),
      },
    });

    if (checkInRecord) {
      return { isValid: false, message: 'Employee has already checked in today.' };
    }

    return { isValid: true };
  }
}