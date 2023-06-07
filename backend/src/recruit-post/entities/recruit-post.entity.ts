import { Entity, ManyToOne, Column, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from 'src/core/core.entity';
import { Part } from 'src/part/entities/part.entity';
import { IsString } from 'class-validator';
import { Resume } from 'src/resume/entities/resume.entity';

// 파트 정보 관련
@Entity('RecruitPost')
export class RecruitPost extends CoreEntity {
  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  content: string;

  @Column()
  @IsString()
  careerType: string;

  @Column()
  @IsString()
  workType: string;

  @ManyToOne(() => Part, (part) => part.recruitPosts, { onDelete: 'CASCADE' })
  part: Part;
  @RelationId((recruitPost: RecruitPost) => recruitPost.part)
  partId: string;

  @OneToMany(() => Resume, (resume) => resume.recruitPost)
  resumes: Resume[];
}
