import { Injectable } from '@nestjs/common';
import { PartRepository } from './part.repository';
import { GetPartsOutput } from './dtos/gets.dto';

@Injectable()
export class PartService {
  constructor(private readonly partsRepo: PartRepository) {}
  async getParts(): Promise<GetPartsOutput> {
    try {
      const parts = await this.partsRepo.find({
        // 사실 정렬은 큰 의미 없을듯?
        order: {
          createdAt: 'ASC',
        },
      });
      return {
        ok: true,
        parts,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || '파트 목록을 불러올 수 없습니다.',
      };
    }
  }

  // async getPart(partId: string): Promise<GetPartOutput> {
  //   try {
  //     await this.partsRepo.isExistPart(partId);

  //     return this.partsRepo.findOne({
  //       where: { id: partId },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // async createPart(createPartData: CreatePartInput): Promise<CreatePartOutput> {
  //   try {
  //     const newPartData = await this.partsRepo.save(
  //       this.partsRepo.create(createPartData),
  //     );
  //     return newPartData;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async patchPart({
  //   partId,
  //   ...patchPartData
  // }: PatchPartInput): Promise<PatchPartOutput> {
  //   try {
  //     await this.partsRepo.isExistPart(partId);

  //     const updatedPartData = await this.partsRepo.save({
  //       Id: partId,
  //       ...patchPartData,
  //     });
  //     return updatedPartData;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async deletePart({ id: partId }: DeletePartInput): Promise<DeletePartOutput> {
  //   try {
  //     await this.partsRepo.isExistPart(partId);

  //     await this.partsRepo.delete({
  //       id: partId,
  //     });
  //     return { id: partId };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
