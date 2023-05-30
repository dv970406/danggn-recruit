import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApplicantService } from '../applicant/Applicant.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  // guard에서 applicant를 찾는 로직을 넣을까 했는데 guard와 AuthUser 데코레이터에서 쉽게 꺼내 쓰기 위해 여기서 작성
  // 여기서 applicant 데이터 찾아서 다시 req에 넣어주지 않으면 guard와 AuthUser 데코레이터에서 토큰을 통해 각각 applicant 데이터를 찾아야함
  constructor(private readonly applicantService: ApplicantService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.headers;
      if (token) {
        const applicantId = jwt.verify(
          token as string,
          process.env.JWT_SECRET_KEY,
        );

        const { applicant } = await this.applicantService.getApplicant({
          id: applicantId as string,
        });

        req['applicant'] = applicant;
        next();
      } else {
        // 토큰이 없거나 조작된 경우 getAppliedRecruitPosts는 존재하지 않을 것이므로 서버측 토큰을 삭제하고 404를 반환함
        // 그리고 클라이언트 측에서 auth페이지로 되돌려 보낼것임
        res.cookie('token', '', {
          maxAge: 0,
        });
        const errMessage = new UnauthorizedException(
          '지원자 정보를 찾을 수 없습니다.',
        );
        next(errMessage);
      }
    } catch (error) {
      next(error.message);
    }
  }
}
