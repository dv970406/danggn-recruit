import { Entity, OneToMany, Column } from 'typeorm';
import { CoreEntity } from 'src/core/core.entity';
import { RecruitPost } from 'src/recruit-post/entities/recruit-post.entity';
import { IsString } from 'class-validator';

// 파트 정보 관련
@Entity('Part')
export class Part extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  partName: string;

  @OneToMany(() => RecruitPost, (recruitPost) => recruitPost.part)
  recruitPosts: RecruitPost[];
}
