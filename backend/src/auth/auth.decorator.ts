import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// jwt.middleware에서 req객체에 넣어놓은 applicant 데이터를 추출해서 활용하기 위함
export const AuthApplicant = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const authApplicant = context.switchToHttp().getRequest().applicant;

    return authApplicant;
  },
);
