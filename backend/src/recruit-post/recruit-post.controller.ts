import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecruitPostService } from './recruit-post.service';
import { GetRecruitPostOutput } from './dtos/get.dto';
import { FilteringRecruitPosts, GetRecruitPostsOutput } from './dtos/gets.dto';

@Controller('recruit-post')
export class RecruitPostController {
  constructor(private readonly recruitPostService: RecruitPostService) {}

  @Get()
  async getRecruitPosts(
    @Query() filterData: FilteringRecruitPosts,
  ): Promise<GetRecruitPostsOutput> {
    return this.recruitPostService.getRecruitPosts(filterData);
  }

  @Get(':recruitPostId')
  async getRecruitPost(
    @Param('recruitPostId') recruitPostId: string,
  ): Promise<GetRecruitPostOutput> {
    return this.recruitPostService.getRecruitPost(recruitPostId);
  }

  // 나중에 쓸수도?
  // @Post()
  // async createRecruitPost(
  //   @Body() createRecruitPostData: CreateRecruitPostInput,
  // ): Promise<CreateRecruitPostOutput> {
  //   return this.recruitPostService.createRecruitPost(createRecruitPostData);
  // }

  // @Patch()
  // async patchRecruitPost(
  //   @Body() createRecruitPostData: PatchRecruitPostInput,
  // ): Promise<PatchRecruitPostOutput> {
  //   return this.recruitPostService.patchRecruitPost(createRecruitPostData);
  // }

  // @Delete(':recruitPostId')
  // async deleteRecruitPost(
  //   @Param('recruitPostId') deletedRecruitPostData: DeleteRecruitPostInput,
  // ): Promise<DeleteRecruitPostOutput> {
  //   return this.recruitPostService.deleteRecruitPost(deletedRecruitPostData);
  // }
}
