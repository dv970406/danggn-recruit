import { PickType } from '@nestjs/mapped-types';
import { Applicant } from '../entities/applicant.entity';
import { CoreOutput } from '@/src/core/core.dto';

export class GetApplicantInput extends PickType(Applicant, ['id']) {}

export class GetApplicantOutput extends CoreOutput {
  applicant?: Applicant;
}
