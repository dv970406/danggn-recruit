import { Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';
import { CustomRepository } from 'src/core/typeorm-ex.decorator';

@CustomRepository(Resume)
export class ResumeRepository extends Repository<Resume> {
  // 존재하는 지원서인지 체크
  async isExistResume(resumeId: string) {
    const isExist = await this.exist({
      where: { id: resumeId },
    });

    if (!isExist) {
      throw new Error('존재하지 않는 지원서입니다.');
    }

    return isExist;
  }

  // 해당하는 Id의 지원서 가져오기
  async findResume(resumeId: string) {
    await this.isExistResume(resumeId);

    const Resume = await this.findOne({
      where: { id: resumeId },
    });

    return Resume;
  }
}
