import { CoreOutput } from '@/src/core/core.dto';
import { Resume } from '../entities/resume.entity';

export type GetMyResumeInput = string;
export class GetMyResumeOutput extends CoreOutput {
  resume?: Resume;
}
