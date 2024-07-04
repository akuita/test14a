import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RecordEmployeeCheckInDto {
  @IsNumber({}, { message: 'Employee ID must be a number' })
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: number;

  @IsString({ message: 'Check-in time must be a string' })
  @IsNotEmpty({ message: 'Check-in time is required' })
  checkInTime: string;

  @IsString({ message: 'Date must be a string' })
  @IsNotEmpty({ message: 'Date is required' })
  date: string;
}