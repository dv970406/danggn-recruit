import { Repository } from 'typeorm';
import { RecruitPost } from './entities/recruit-post.entity';
import { CustomRepository } from 'src/core/typeorm-ex.decorator';

@CustomRepository(RecruitPost)
export class RecruitPostRepository extends Repository<RecruitPost> {
  // 존재하는 공고인지 체크
  async isExistRecruitPost(recruitPostId: string) {
    const isExist = await this.exist({
      where: { id: recruitPostId },
    });

    if (!isExist) {
      throw new Error('존재하지 않는 공고입니다.');
    }

    return isExist;
  }

  // 해당하는 Id의 공고 가져오기
  async findRecruitPost(recruitPostId: string) {
    await this.isExistRecruitPost(recruitPostId);

    const part = await this.findOne({
      where: { id: recruitPostId },
      relations: {
        part: true,
      },
    });

    return part;
  }
}
