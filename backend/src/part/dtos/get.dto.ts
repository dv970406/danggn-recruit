import { PickType } from '@nestjs/mapped-types';
import { Part } from '../entities/part.entity';

export class GetPartInput extends PickType(Part, ['id']) {}
export class GetPartOutput extends Part {}
