import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCheckInButtonStateDto {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;
}