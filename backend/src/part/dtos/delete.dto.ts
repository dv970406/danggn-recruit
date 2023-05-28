import { PickType } from '@nestjs/mapped-types';
import { Part } from '../entities/part.entity';

export class DeletePartInput extends PickType(Part, ['id']) {}

export class DeletePartOutput extends PickType(Part, ['id']) {}
