import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicantService {
  getHello(): string {
    return 'Hello World!';
  }
}
