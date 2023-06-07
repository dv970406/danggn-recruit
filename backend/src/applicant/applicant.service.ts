import { Injectable } from '@nestjs/common';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { ApplicantRepository } from './repositories/applicant.repository';
import * as jwt from 'jsonwebtoken';
import { GetApplicantInput, GetApplicantOutput } from './dtos/get.dto';

@Injectable()
export class ApplicantService {
  constructor(private readonly applicantsRepo: ApplicantRepository) {}

  async login({ email, name, phoneNumber }: LoginInput): Promise<LoginOutput> {
    try {
      await this.applicantsRepo.isExistApplicant(email, name, phoneNumber);

      const findApplicant = await this.applicantsRepo.findOne({
        where: {
          email,
          name,
          phoneNumber,
        },
      });

      const token = jwt.sign(findApplicant.id, process.env.JWT_SECRET_KEY);

      // string으로 변환 후 응답
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || '존재하지 않는 지원자입니다.',
      };
    }
  }

  async getApplicant({
    id: applicantId,
  }: GetApplicantInput): Promise<GetApplicantOutput> {
    try {
      const findApplicant = await this.applicantsRepo.findApplicantById(
        applicantId,
      );

      return {
        ok: true,
        applicant: findApplicant,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || '해당 지원자 조회에 실패했습니다.',
      };
    }
  }
}
