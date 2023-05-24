import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';

@Module({
  providers: [ApplicationController, ApplicationService],
})
export class ApplicationModule {}
