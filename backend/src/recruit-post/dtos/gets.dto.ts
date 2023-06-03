import { CoreOutput, InfiniteScrollingInput } from '@/src/core/core.dto';
import { RecruitPost } from '../entities/recruit-post.entity';

export class FilteringRecruitPosts extends InfiniteScrollingInput {
  partName: string;
  careerType: string;
  keyword: string;
}
export class GetRecruitPostsOutput extends CoreOutput {
  recruitPosts?: RecruitPost[];
}
