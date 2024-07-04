import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { Employee } from '../../entities/employees';
import { AttendanceRecord } from '../../entities/attendance_records';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, AttendanceRecord])],
  providers: [EmployeeService],
})
export class EmployeeModule {}