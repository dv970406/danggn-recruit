import { Module } from '@nestjs/common';
import { RecruitPostController } from './recruit-post.controller';
import { RecruitPostService } from './recruit-post.service';
import { RecruitPostRepository } from './recruit-post.repository';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([RecruitPostRepository])],
  providers: [RecruitPostService],
  controllers: [RecruitPostController],
})
export class RecruitPostModule {}
