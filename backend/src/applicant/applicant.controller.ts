import { Controller, Get } from '@nestjs/common';
import { ApplicantService } from './Applicant.service';

@Controller()
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Get()
  getHello(): string {
    return this.applicantService.getHello();
  }
}
