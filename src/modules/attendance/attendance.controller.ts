import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RecordEmployeeCheckInDto } from './dto/record-employee-check-in.dto';
import { AttendanceService } from './attendance.service';
import { EmployeeService } from '../employee/employee.service';

@Controller('api/attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post('check-in')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async checkIn(@Body() recordEmployeeCheckInDto: RecordEmployeeCheckInDto) {
    try {
      const { employeeId } = recordEmployeeCheckInDto;
      const validation = await this.employeeService.validateEmployeeCheckIn(employeeId);

      if (!validation.isValid) {
        return {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: validation.message,
        };
      }

      const checkInResult = await this.attendanceService.recordEmployeeCheckIn(employeeId);
      return {
        status: HttpStatus.OK,
        message: checkInResult.message,
        check_in_time: new Date().toISOString(),
      };
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'An unexpected error has occurred on the server.';

      if (error.message === 'Employee is not registered.') {
        status = HttpStatus.BAD_REQUEST;
        message = error.message;
      } else if (error.message === 'Employee has already checked in today.') {
        status = HttpStatus.FORBIDDEN;
        message = error.message;
      } else if (error.message === 'Check-in is not allowed at this time.') {
        status = HttpStatus.UNAUTHORIZED;
        message = error.message;
      }

      return {
        status,
        message,
      };
    }
  }
}