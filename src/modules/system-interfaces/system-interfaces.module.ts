import { Module } from '@nestjs/common';
import { SystemInterfacesService } from './system-interfaces.service';

@Module({
  providers: [SystemInterfacesService],
})
export class SystemInterfacesModule {}