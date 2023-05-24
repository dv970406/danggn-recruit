import { Module } from '@nestjs/common';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './Applicant.service';

@Module({
  providers: [ApplicantController, ApplicantService],
})
export class ApplicantModule {}
