import { Module } from '@nestjs/common';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './applicant.service';
import { TypeOrmExModule } from '../core/typeorm-ex.module';
import { ApplicantRepository } from './repositories/applicant.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ApplicantRepository])],
  providers: [ApplicantService],
  controllers: [ApplicantController],
  exports: [ApplicantService],
})
export class ApplicantModule {}
