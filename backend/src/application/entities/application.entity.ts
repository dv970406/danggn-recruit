import { Column, Entity } from 'typeorm';
import { CoreEntity } from 'src/core/core.entity';

@Entity('Application')
export class Application extends CoreEntity {
  @Column()
  Name: string;

  @Column()
  PhoneNumber: string;

  @Column()
  Email: string;

  @Column()
  IsDisability: boolean;

  @Column()
  IsVeteransAward: boolean;
}
