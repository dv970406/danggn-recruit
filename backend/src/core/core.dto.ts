import { IsString, IsDate } from 'class-validator';

export class CoreDTO {
  @IsString()
  readonly Id: string;

  @IsDate()
  readonly CreatedAt: string;

  @IsDate()
  readonly UpdatedAt: string;
}
