import { IsNumber, IsString, Matches } from 'class-validator';

export class CheckAttendanceStatusDto {
  @IsNumber({}, { message: 'employeeId must be a number' })
  employeeId: number;

  @IsString({ message: 'date must be a string' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must be in the format YYYY-MM-DD' })
  date: string;
}