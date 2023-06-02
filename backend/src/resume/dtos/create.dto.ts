import { CoreOutput } from '@/src/core/core.dto';
import { Resume } from '../entities/resume.entity';

export class CreateResumeInput {
  recruitPostId: string;
  name: string;
  email: string;
  phoneNumber: string;
  disability: string;
  veteransAward: string;
  militaryServiceException: string;
}

export class CreateResumeOutput extends CoreOutput {
  resume?: Resume;
}
