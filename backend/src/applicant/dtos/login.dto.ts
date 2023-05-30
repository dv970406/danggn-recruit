import { PickType } from '@nestjs/mapped-types';
import { Applicant } from '../entities/applicant.entity';
import { CoreOutput } from '@/src/core/core.dto';

export class LoginInput extends PickType(Applicant, [
  'email',
  'phoneNumber',
  'name',
]) {}

export class LoginOutput extends CoreOutput {
  token?: string;
}
