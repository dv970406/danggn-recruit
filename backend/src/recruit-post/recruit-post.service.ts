import { Injectable } from '@nestjs/common';
import { GetRecruitPostOutput } from './dtos/get.dto';

import { RecruitPostRepository } from './recruit-post.repository';
import { FilteringRecruitPosts, GetRecruitPostsOutput } from './dtos/gets.dto';
import { Like } from 'typeorm';

@Injectable()
export class RecruitPostService {
  constructor(private readonly recruitPostsRepo: RecruitPostRepository) {}
  async getRecruitPosts({
    careerType,
    keyword,
    partName,
    pageParam,
  }: FilteringRecruitPosts): Promise<GetRecruitPostsOutput> {
    try {
      // 인피니티 스크롤 구현
      const findRecruitPosts = await this.recruitPostsRepo.find({
        where: {
          title: Like(`%${keyword}%`),
          part: {
            partName,
          },
          careerType,
        },
        relations: {
          part: true,
        },
        order: {
          createdAt: 'DESC',
        },

        // 가장 흔한 패턴의 take, skip 사용
        take: 5,
        skip: (+pageParam - 1) * 5,
      });

      let isLastPage = false;
      // 개수가 5개 미만이면 다음에는 더이상 가져올 것이 없다는 뜻
      if (findRecruitPosts.length < 5) {
        isLastPage = true;
      }
      return {
        ok: true,
        recruitPosts: findRecruitPosts,
        isLastPage,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || '채용공고 목록을 불러올 수 없습니다.',
      };
    }
  }

  async getRecruitPost(recruitPostId: string): Promise<GetRecruitPostOutput> {
    try {
      await this.recruitPostsRepo.isExistRecruitPost(recruitPostId);

      const findRecruitPost = await this.recruitPostsRepo.findOne({
        where: { id: recruitPostId },
        relations: {
          part: true,
        },
      });

      return {
        ok: true,
        recruitPost: findRecruitPost,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || '채용공고를 불러올 수 없습니다',
      };
    }
  }
  // async createRecruitPost(
  //   createRecruitPostData: CreateRecruitPostInput,
  // ): Promise<CreateRecruitPostOutput> {
  //   try {
  //     const newRecruitPostData = await this.recruitPostsRepo.save(
  //       this.recruitPostsRepo.create(createRecruitPostData),
  //     );
  //     return newRecruitPostData;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async patchRecruitPost({
  //   id: recruitPostId,
  //   ...patchRecruitPostData
  // }: PatchRecruitPostInput): Promise<PatchRecruitPostOutput> {
  //   try {
  //     await this.recruitPostsRepo.isExistRecruitPost(recruitPostId);

  //     const updatedRecruitPostData = await this.recruitPostsRepo.save({
  //       id: recruitPostId,
  //       ...patchRecruitPostData,
  //     });
  //     return updatedRecruitPostData;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async deleteRecruitPost({
  //   id: recruitPostId,
  // }: DeleteRecruitPostInput): Promise<DeleteRecruitPostOutput> {
  //   try {
  //     await this.recruitPostsRepo.isExistRecruitPost(recruitPostId);

  //     await this.recruitPostsRepo.delete({
  //       id: recruitPostId,
  //     });
  //     return { id: recruitPostId };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
