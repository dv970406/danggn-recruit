import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from 'src/core/core.entity';
import { IsString, IsOptional } from 'class-validator';
import { RecruitPost } from 'src/recruit-post/entities/recruit-post.entity';
import { Applicant } from '../../applicant/entities/applicant.entity';

// 지원 정보 관련
@Entity('Resume')
export class Resume extends CoreEntity {
  // 파일 자체가 아니라 파일은 원격 저장소 S3에 저장해놓고 그 링크를 저장할것임
  @Column()
  @IsString()
  pdfLink: string;

  @ManyToOne(() => Applicant, (user) => user.resumes)
  applicant: Applicant;

  @ManyToOne(() => RecruitPost, (recruitPost) => recruitPost.resumes)
  recruitPost: RecruitPost;
}
