import { PickType } from '@nestjs/mapped-types';
import { RecruitPost } from '../entities/recruit-post.entity';
import { CoreOutput } from '@/src/core/core.dto';

export class GetRecruitPostInput extends PickType(RecruitPost, ['id']) {}
export class GetRecruitPostOutput extends CoreOutput {
  recruitPost?: RecruitPost;
}
