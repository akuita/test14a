import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeService } from '../employee/employee.service';
import { SystemInterface } from '../../entities/system_interfaces';
import { BaseRepository } from '../../shared/base.repository';

@Injectable()
export class SystemInterfacesService {
  constructor(
    @InjectRepository(SystemInterface)
    private systemInterfacesRepository: BaseRepository<SystemInterface>, private employeeService: EmployeeService
  ) {}

  async updateCheckInButtonState(employeeId: number): Promise<{ confirmation: string }> {
    try {
      // Find the "Check in" button component for the given employeeId
      const checkInButton = await this.systemInterfacesRepository.getOne({
        conditions: [
          { column: 'component_name', value: 'Check in', operator: 'EQUAL' },
          { column: 'employee_id', value: employeeId, operator: 'EQUAL' },
        ],
      });

      // Validate employee check-in status
      const validation = await this.employeeService.validateEmployeeCheckIn(employeeId);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }

      // Update the state of the "Check in" button to disabled
      await this.systemInterfacesRepository.updateOne({
        conditions: [{ column: 'id', value: checkInButton.id, operator: 'EQUAL' }],
        data: { component_state: 'disabled' },
      });

      // Ensure that the "Checked out" status component remains visible but inactive
      // This part of the requirement is a bit unclear. Assuming there is a 'component_state' field that can be set to 'inactive'
      await this.systemInterfacesRepository.updateOne({
        conditions: [
          { column: 'component_name', value: 'Checked out', operator: 'EQUAL' },
          { column: 'employee_id', value: employeeId, operator: 'EQUAL' },
        ],
        data: { component_state: 'inactive' },
      });

      return { confirmation: 'Interface components have been updated successfully.' };
    } catch (error) {
      throw new Error(`Failed to update interface components: ${error.message}`);
    }
  }
}