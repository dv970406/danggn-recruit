import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from 'src/core/core.entity';
import { IsString, IsEmail, IsBoolean } from 'class-validator';
import { Resume } from 'src/resume/entities/resume.entity';

// 지원자 정보 관련
@Entity('Applicant')
export class Applicant extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsString()
  phoneNumber: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsBoolean()
  disability: string;

  @Column()
  @IsBoolean()
  veteransAward: string;

  @Column()
  @IsString()
  militaryServiceException: string;

  @OneToMany(() => Resume, (resume) => resume.applicant)
  resumes: Resume[];
}
