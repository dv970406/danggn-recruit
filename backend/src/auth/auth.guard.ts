import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const applicant = context.switchToHttp().getRequest().applicant;

    if (!applicant) return false;

    return true;
  }
}
