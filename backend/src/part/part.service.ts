import { Injectable } from '@nestjs/common';
import { GetPartOutput } from './dtos/get.dto';
import { CreatePartInput, CreatePartOutput } from './dtos/create.dto';
import { PatchPartInput, PatchPartOutput } from './dtos/patch.dto';
import { DeletePartInput, DeletePartOutput } from './dtos/delete.dto';
import { PartRepository } from './part.repository';
import { GetPartsOutput } from './dtos/gets.dto';

@Injectable()
export class PartService {
  constructor(private readonly partsRepo: PartRepository) {}
  async getParts(): Promise<GetPartsOutput[]> {
    try {
      const parts = await this.partsRepo.find({
        order: {
          createdAt: 'ASC',
        },
      });
      return parts;
    } catch (error) {
      console.log(error);
    }
  }

  async getPart(partId: string): Promise<GetPartOutput> {
    try {
      await this.partsRepo.isExistPart(partId);

      return this.partsRepo.findOne({
        where: { id: partId },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async createPart(createPartData: CreatePartInput): Promise<CreatePartOutput> {
    try {
      const newPartData = await this.partsRepo.save(
        this.partsRepo.create(createPartData),
      );
      return newPartData;
    } catch (error) {
      console.log(error);
    }
  }

  async patchPart({
    partId,
    ...patchPartData
  }: PatchPartInput): Promise<PatchPartOutput> {
    try {
      await this.partsRepo.isExistPart(partId);

      const updatedPartData = await this.partsRepo.save({
        Id: partId,
        ...patchPartData,
      });
      return updatedPartData;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePart({ id: partId }: DeletePartInput): Promise<DeletePartOutput> {
    try {
      await this.partsRepo.isExistPart(partId);

      await this.partsRepo.delete({
        id: partId,
      });
      return { id: partId };
    } catch (error) {
      console.log(error);
    }
  }
}
