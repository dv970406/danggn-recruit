import { CoreEntity } from 'src/core/core.entity';
import { Column, Entity } from 'typeorm';

@Entity('Applicant')
export class Applicant extends CoreEntity {
  @Column()
  GithubLink: string;

  @Column()
  BlogLink: string;
}
