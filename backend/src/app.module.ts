import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ResumeModule } from './resume/resume.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Resume } from './resume/entities/resume.entity';
import { TypeOrmExModule } from './core/typeorm-ex.module';
import { Part } from './part/entities/part.entity';
import { PartModule } from './part/part.module';
import { RecruitPost } from './recruit-post/entities/recruit-post.entity';
import { RecruitPostModule } from './recruit-post/recruit-post.module';
import { Applicant } from './applicant/entities/applicant.entity';
import { ApplicantModule } from './applicant/applicant.module';
import { JwtMiddleware } from './auth/jwt.middleware';
import { JwtModule } from './auth/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.local' : '.env.prod',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: [Part, RecruitPost, Applicant, Resume],
    }),
    TypeOrmExModule,
    ResumeModule,
    PartModule,
    RecruitPostModule,
    ApplicantModule,
    JwtModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 로그인 로직이 들어가는 것은 /resume 경로의 라우터들이므로 그 곳만 jwt.middleware를 설정한다.
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/resume/*',
      method: RequestMethod.GET,
    });
  }
}
