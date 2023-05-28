import { PartialType } from '@nestjs/mapped-types';
import { Part } from '../entities/part.entity';

export class PatchPartInput extends PartialType(Part) {
  partId: string;
}

export class PatchPartOutput extends Part {}
