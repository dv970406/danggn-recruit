import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { ResumeRepository } from './repositories/resume.repository';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';
import { ApplicantRepository } from '../applicant/repositories/applicant.repository';
import { RecruitPostRepository } from 'src/recruit-post/recruit-post.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      ResumeRepository,
      ApplicantRepository,
      RecruitPostRepository,
    ]),
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
