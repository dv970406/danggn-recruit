import { Part } from '../entities/part.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreatePartInput extends OmitType(Part, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class CreatePartOutput extends Part {}
