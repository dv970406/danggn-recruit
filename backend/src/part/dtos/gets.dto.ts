import { CoreOutput } from '@/src/core/core.dto';
import { Part } from '../entities/part.entity';

export class GetPartsInput {}
export class GetPartsOutput extends CoreOutput {
  parts?: Part[];
}
