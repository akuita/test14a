import { Body, Controller, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Auth } from '../../decorators/auth.decorator';
import { UpdateCheckInButtonStateDto } from './dto/update-check-in-button-state.dto';
import { SystemInterfacesService } from './system-interfaces.service';

@Controller()
export class SystemInterfacesController {
  constructor(private readonly systemInterfacesService: SystemInterfacesService) {}

  @Put('/api/system-interface/update-check-in-button')
  @Auth()
  async updateCheckInButtonState(@Body() updateCheckInButtonStateDto: UpdateCheckInButtonStateDto) {
    try {
      const { employeeId } = updateCheckInButtonStateDto;
      const result = await this.systemInterfacesService.updateCheckInButtonState(employeeId);
      return {
        status: HttpStatus.OK,
        message: result.confirmation,
      };
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = error.message;

      if (error.message.includes('Employee not registered')) {
        status = HttpStatus.BAD_REQUEST;
      } else if (error.message.includes('Check-in not completed')) {
        status = HttpStatus.UNPROCESSABLE_ENTITY;
      }

      throw new HttpException({ status, message }, status);
    }
  }
}