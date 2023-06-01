import { Repository } from 'typeorm';
import { Applicant } from '../entities/applicant.entity';
import { CustomRepository } from 'src/core/typeorm-ex.decorator';

@CustomRepository(Applicant)
export class ApplicantRepository extends Repository<Applicant> {
  // 존재하는 지원자인지 체크
  async isExistApplicant(email: string, name?: string, phoneNumber?: string) {
    const isExist = await this.exist({
      where: {
        email,
        ...(name && { name }),
        ...(phoneNumber && { phoneNumber }),
      },
    });

    if (!isExist) {
      throw new Error(
        '지원 당시에 제출한 이름, 전화번호, 이메일을 입력해주세요.',
      );
    }

    return isExist;
  }

  // 해당하는 Id의 지원자 가져오기
  async findApplicantById(applicantId: string) {
    const applicant = await this.findOne({
      where: { id: applicantId },
    });

    if (!applicant) {
      throw new Error('존재하지 않는 지원자입니다.');
    }
    return applicant;
  }
}
