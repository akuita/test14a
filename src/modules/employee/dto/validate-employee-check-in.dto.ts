import { IsNotEmpty, IsNumber } from 'class-validator';

export class ValidateEmployeeCheckInDto {
  @IsNumber({}, { message: 'Employee ID must be a number' })
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: number;
}