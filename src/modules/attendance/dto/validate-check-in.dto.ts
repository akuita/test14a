import { IsNotEmpty } from 'class-validator';

export class ValidateCheckInDto {
  @IsNotEmpty()
  employeeId: number;

  @IsNotEmpty()
  date: string;
}