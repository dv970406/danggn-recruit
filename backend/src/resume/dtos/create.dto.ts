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

  // 어느 이메일로 지원서를 받을 것인가.
  receiveEmail: string;
}

export class CreateResumeOutput extends CoreOutput {
  resume?: Resume;
}
