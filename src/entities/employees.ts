import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AttendanceRecord } from './attendance-record.entity';

@Entity('employees')
export class Employee {
  @OneToMany(() => AttendanceRecord, attendanceRecord => attendanceRecord.employee)
  attendanceRecords: AttendanceRecord[];

  @PrimaryGeneratedColumn()
  id: number;
}