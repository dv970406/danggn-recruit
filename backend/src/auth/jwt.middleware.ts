import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApplicantService } from '../applicant/Applicant.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  // guard에서 applicant를 찾는 로직을 넣을까 했는데 AuthGuard와 AuthUser 데코레이터에서 쉽게 꺼내 쓰기 위해 여기서 작성
  // 여기서 applicant 데이터 찾아서 다시 req에 넣어주지 않으면 AuthGuard와 AuthUser데코레이터에서 토큰을 통해 각각 applicant 데이터를 찾아야함
  constructor(private readonly applicantService: ApplicantService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.headers;

      const applicantId = jwt.verify(
        token as string,
        process.env.JWT_SECRET_KEY,
      );

      const { applicant } = await this.applicantService.getApplicant({
        id: applicantId as any,
      });

      // 설령 applicant 데이터가 없어도 이 middleware를 사용하는 라우터들은 AuthGuard에 의해 방어될 것임
      req['applicant'] = applicant;
      next();
    } catch (error) {
      next(error.message);
    }
  }
}
