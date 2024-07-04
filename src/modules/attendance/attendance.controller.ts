import { Body, Controller, Post, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AttendanceService } from './attendance.service';
import { RecordEmployeeCheckInDto } from './dto/record-employee-check-in.dto';

@Controller('attendance')
@ApiTags('Attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/check-in')
  @UseGuards(AuthGuard)
  async recordCheckIn(@Body() recordEmployeeCheckInDto: RecordEmployeeCheckInDto) {
    try {
      await this.attendanceService.validateNonDuplicateCheckIn(recordEmployeeCheckInDto.employeeId, recordEmployeeCheckInDto.date);
      const isPermissible = await this.attendanceService.validateCheckInTime(recordEmployeeCheckInDto.checkInTime);
      if (!isPermissible) {
        throw new HttpException('Check-in is not allowed at this time.', HttpStatus.FORBIDDEN);
      }
      await this.attendanceService.recordEmployeeCheckIn(recordEmployeeCheckInDto);
      return {
        status: HttpStatus.OK,
        message: 'Check-in has been recorded successfully.'
      };
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.response, error.status);
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/validate-check-in')
  async validateCheckIn(@Body() validateCheckInDto: ValidateCheckInDto) {
    const isPermissible = await this.attendanceService.validateCheckInTime(validateCheckInDto.check_in_time);
    if (!isPermissible) {
      return { error: 'Check-in is not allowed during non-permissible hours.' };
    }
    // Proceed with the check-in process if needed
    return { message: 'Check-in time is permissible.' };
  }
}