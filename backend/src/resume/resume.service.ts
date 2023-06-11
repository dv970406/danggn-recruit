import { Injectable } from '@nestjs/common';
import { CreateResumeInput, CreateResumeOutput } from './dtos/create.dto';
import { ResumeRepository } from './resume.repository';
import { ApplicantRepository } from '../applicant/repositories/applicant.repository';
import { GetMyResumeInput, GetMyResumeOutput } from './dtos/get.dto';
import { GetAppliedRecruitPostsOutput } from './dtos/gets.dto';
import { RecruitPostRepository } from 'src/recruit-post/recruit-post.repository';
import { sendEmail, uploadPDFFile } from './resume.util';
import { FILE_SIZE_50MB_TO_BYTES } from '../core/shared.const';
import { Applicant } from '../applicant/entities/applicant.entity';

@Injectable()
export class ResumeService {
  constructor(
    private readonly resumesRepo: ResumeRepository,
    private readonly applicantsRepo: ApplicantRepository,
    private readonly recruitPostsRepo: RecruitPostRepository,
  ) {}

  // 내 지원내역 보기
  async getAppliedRecruitPosts(
    authApplicant: Applicant,
  ): Promise<GetAppliedRecruitPostsOutput> {
    try {
      const myResumes = await this.resumesRepo.find({
        where: {
          applicant: {
            id: authApplicant.id,
          },
        },
        relations: {
          recruitPost: {
            part: true,
          },
        },

        order: {
          createdAt: 'DESC',
        },
      });
      return {
        ok: true,
        myInfo: authApplicant,
        myResumes,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || '지원한 채용공고의 목록을 불러올 수 없습니다.',
      };
    }
  }

  // 내 지원서 보기
  async getMyResume(
    resumeId: GetMyResumeInput,
    authApplicant: Applicant,
  ): Promise<GetMyResumeOutput> {
    try {
      await this.resumesRepo.isExistResume(resumeId);

      const findResume = await this.resumesRepo.findOne({
        where: {
          id: resumeId,
          ...(authApplicant && { applicant: { id: authApplicant.id } }),
        },
        relations: {
          applicant: true,
          recruitPost: {
            part: true,
          },
        },
      });
      return {
        ok: true,
        resume: findResume,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || '해당 채용공고의 지원서를 불러올 수 없습니다.',
      };
    }
  }

  async createResume(
    { recruitPostId, receiveEmail, ...applicantData }: CreateResumeInput,
    pdfFile: Express.Multer.File,
  ): Promise<CreateResumeOutput> {
    // 파일 크기 체크
    try {
      if (pdfFile.size > FILE_SIZE_50MB_TO_BYTES) {
        throw new Error('파일의 크기는 50MB를 넘을 수 없습니다.');
      }
      // 지원자가 이전에 지원한 이력이 있는지 체크
      let findApplicant = await this.applicantsRepo.findOne({
        where: {
          email: applicantData.email,
        },
      });

      // 지원이 처음이라면 applicant 추가
      if (!findApplicant) {
        findApplicant = await this.applicantsRepo.save(
          this.applicantsRepo.create(applicantData),
        );
      }

      // 지원서 제출시에는 따로 로그인이 없기에 제출 시에 들어오는 이메일가 Unique이므로 중복지원 여부를 판단함
      const isAlreadyApplied = await this.resumesRepo.exist({
        where: {
          recruitPost: {
            id: recruitPostId,
          },
          applicant: {
            email: findApplicant.email,
            phoneNumber: findApplicant.phoneNumber,
          },
        },
      });

      // 이미 지원한 전적이 있다면 제출을 막는다.
      if (isAlreadyApplied) throw new Error('이미 지원한 내역이 있습니다.');

      // 이력서 PDF를 S3에 저장하고 그 링크를 return받음
      const savedPdfLink = await uploadPDFFile({
        email: findApplicant.email,
        file: pdfFile,
      });

      // 추가될 Resume에 relation을 걸기 위해 recruitPost를 찾음
      const recruitPost = await this.recruitPostsRepo.findRecruitPost(
        recruitPostId,
      );

      // Resume data 추가
      const newResumeData = await this.resumesRepo.save(
        this.resumesRepo.create({
          applicant: findApplicant,
          recruitPost,
          pdfLink: savedPdfLink,
        }),
      );

      // 관리자에게 PDF파일이 첨부된 이메일 발송
      sendEmail({
        applicantData,
        recruitPostData: recruitPost,
        pdfFile,
        receiveEmail,
        resumeCreatedAt: newResumeData.createdAt,
      });
      return {
        ok: true,
        resume: newResumeData,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || '지원서 제출에 실패하였습니다.',
      };
    }
  }

  // async patchResume({
  //   resumeId,
  //   ...patchResumeData
  // }: PatchResumeInput): Promise<PatchResumeOutput> {
  //   try {
  //     await this.resumesRepo.isExistResume(resumeId);

  //     const updatedResumeData = await this.resumesRepo.save({
  //       Id: resumeId,
  //       ...patchResumeData,
  //     });
  //     return updatedResumeData;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async deleteResume({
  //   id: resumeId,
  // }: DeleteResumeInput): Promise<DeleteResumeOutput> {
  //   try {
  //     await this.resumesRepo.isExistResume(resumeId);

  //     await this.resumesRepo.delete({
  //       id: resumeId,
  //     });
  //     return { id: resumeId };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
