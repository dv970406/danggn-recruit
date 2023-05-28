import { Repository } from 'typeorm';
import { Part } from './entities/part.entity';
import { CustomRepository } from 'src/core/typeorm-ex.decorator';

@CustomRepository(Part)
export class PartRepository extends Repository<Part> {
  // 존재하는 파트인지 체크
  async isExistPart(partId: string) {
    const isExist = await this.exist({
      where: { id: partId },
    });

    if (!isExist) {
      throw new Error('존재하지 않는 지원서입니다.');
    }

    return isExist;
  }

  // 해당하는 Id의 파트 가져오기
  async findPart(partId: string) {
    await this.isExistPart(partId);

    const part = await this.findOne({
      where: { id: partId },
    });

    return part;
  }
}
