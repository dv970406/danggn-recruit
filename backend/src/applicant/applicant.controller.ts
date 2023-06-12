import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { LoginInput } from './dtos/login.dto';
import { Response } from 'express';

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  // 내 지원현황을 보기 위한 로그인
  @Post('auth')
  @HttpCode(200)
  async login(
    @Res() res: Response,
    @Body() getAuthInput: LoginInput,
  ): Promise<Response> {
    const { ok, token, error } = await this.applicantService.login(
      getAuthInput,
    );

    // ok, error, value 패턴으로 return하고 싶지만 httponly cookie 사용을 위해선 res객체로 응답해야함
    if (ok) {
      res.setHeader('Authorization', `Bearer ${token}`);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 하루
        sameSite: 'none', // 백엔드 배포한 서비스와 프론트엔드 배포한 서비스가 다름
        domain: 'danggn-recruit.vercel.app',
      });
      return res.status(200).json({ ok });
    } else {
      return res.status(404).json({ ok, error });
    }
  }
}
