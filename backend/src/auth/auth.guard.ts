import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// jwt.middleware에서 req객체에 넣어놓은 applicant의 값이 없으면 요청을 block하는 guard
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const applicant = context.switchToHttp().getRequest().applicant;
    if (!applicant) return false;

    return true;
  }
}
