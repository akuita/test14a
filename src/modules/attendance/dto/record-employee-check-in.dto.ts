import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class RecordEmployeeCheckInDto {
  @IsNumber({}, { message: 'Employee ID must be a number' })
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: number;

  @IsDateString({ message: 'Check-in time must be a valid datetime string' })
  @IsNotEmpty({ message: 'Check-in time is required' })
  checkInTime: string;

  @IsDateString({ message: 'Date must be a valid date string' })
  @IsNotEmpty({ message: 'Date is required' })
  date: string;
}