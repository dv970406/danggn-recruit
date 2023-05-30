import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApplicantService } from './Applicant.service';
import { LoginInput } from './dtos/login.dto';
import { Response } from 'express';

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Post('auth')
  @HttpCode(200)
  async login(
    @Res() res: Response,
    @Body() getAuthInput: LoginInput,
  ): Promise<Response> {
    const { ok, token } = await this.applicantService.login(getAuthInput);

    // 그냥 ok, error 패턴으로 return하고 싶은데 httponly cookie 사용을 위해선 res객체로 응답해야함
    if (ok) {
      res.setHeader('Authorization', `Bearer ${token}`);
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 하루
      });
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  }
}
