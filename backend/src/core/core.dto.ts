import { IsString, IsBoolean, IsOptional } from 'class-validator';

// return 값의 통일화를 담당함.
// 제너릭으로 안받은 이유는 key의 이름을 다양화하고 싶었기 때문
export class CoreOutput {
  @IsBoolean()
  ok: boolean;

  @IsString()
  @IsOptional()
  error?: string;
}
