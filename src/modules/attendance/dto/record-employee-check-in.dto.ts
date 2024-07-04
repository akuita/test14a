import { IsNotEmpty, IsNumber } from 'class-validator';

export class RecordEmployeeCheckInDto {
  @IsNumber({}, { message: 'employeeId must be a number' })
  @IsNotEmpty({ message: 'employeeId is required' })
  employeeId: number;
}