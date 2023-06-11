import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { GetMyResumeOutput } from './dtos/get.dto';
import { CreateResumeInput, CreateResumeOutput } from './dtos/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_SIZE_50MB_TO_BYTES } from '../core/shared.const';
import { AuthApplicant } from '../auth/auth.decorator';
import { Applicant } from '../applicant/entities/applicant.entity';
import { AuthGuard } from '../auth/auth.guard';
import { GetAppliedRecruitPostsOutput } from './dtos/gets.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  // 로그인한 유저인지 체크 후 그 유저가 지원한 채용공고 리스트를 return함
  @Get('my')
  @UseGuards(AuthGuard)
  async getAppliedRecruitPosts(
    @AuthApplicant() authApplicant: Applicant,
  ): Promise<GetAppliedRecruitPostsOutput> {
    return this.resumeService.getAppliedRecruitPosts(authApplicant);
  }

  // 로그인한 유저인지 체크 후 그 유저가 리스트에서 선택한 채용공고의 detail을 return함
  @Get('my/:resumeId')
  @UseGuards(AuthGuard)
  async getMyResume(
    @Param('resumeId') resumeId: string,
    @AuthApplicant() authApplicant: Applicant,
  ): Promise<GetMyResumeOutput> {
    return this.resumeService.getMyResume(resumeId, authApplicant);
  }

  // PDF파일이 포함된 FormData를 처리하고 Resume을 Create
  @Post()
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('pdfFile', {
      // 50MB === 52,428,800Byte
      limits: { fileSize: FILE_SIZE_50MB_TO_BYTES },
    }),
  )
  async createResume(
    @Body() createResumeData: CreateResumeInput,
    @UploadedFile() pdfFile: Express.Multer.File,
  ): Promise<CreateResumeOutput> {
    return this.resumeService.createResume(createResumeData, pdfFile);
  }

  // @Patch()
  // async patchResume(
  //   @Body() patchResumeData: PatchResumeInput,
  // ): Promise<PatchResumeOutput> {
  //   return this.resumeService.patchResume(patchResumeData);
  // }

  // @Delete(':resumeId')
  // async deleteResume(
  //   @Param('resumeId') deletedResumeData: DeleteResumeInput,
  // ): Promise<DeleteResumeOutput> {
  //   return this.resumeService.deleteResume(deletedResumeData);
  // }
}
