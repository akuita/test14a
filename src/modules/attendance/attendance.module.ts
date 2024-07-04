import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { EmployeeService } from '../employee/employee.service';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { Employee } from 'src/entities/employees';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceRecord, Employee])],
  controllers: [AttendanceController],
  providers: [AttendanceService, EmployeeService, AuthGuard],
})
export class AttendanceModule {}