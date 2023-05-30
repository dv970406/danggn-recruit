import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthApplicant = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const authApplicant = context.switchToHttp().getRequest().applicant;

    return authApplicant;
  },
);
