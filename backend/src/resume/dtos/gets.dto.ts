import { PickType } from '@nestjs/mapped-types';
import { Applicant } from '../../applicant/entities/applicant.entity';
import { Resume } from '../entities/resume.entity';
import { CoreOutput } from '@/src/core/core.dto';

export class GetAppliedRecruitPostsInput extends PickType(Applicant, ['id']) {}
export class GetAppliedRecruitPostsOutput extends CoreOutput {
  myInfo?: Applicant;
  myResumes?: Resume[];
}
