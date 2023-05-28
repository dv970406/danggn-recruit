import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PartService } from './part.service';
import { GetPartOutput } from './dtos/get.dto';
import { CreatePartInput, CreatePartOutput } from './dtos/create.dto';
import { PatchPartInput, PatchPartOutput } from './dtos/patch.dto';
import { DeletePartInput, DeletePartOutput } from './dtos/delete.dto';
import { GetPartsOutput } from './dtos/gets.dto';

@Controller('part')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Get()
  getParts(): Promise<GetPartsOutput[]> {
    return this.partService.getParts();
  }

  @Get(':partId')
  async getPart(@Param('partId') partId: string): Promise<GetPartOutput> {
    return this.partService.getPart(partId);
  }

  @Post()
  async createPart(
    @Body() createPartData: CreatePartInput,
  ): Promise<CreatePartOutput> {
    return this.partService.createPart(createPartData);
  }

  @Patch()
  async patchPart(
    @Body() createPartData: PatchPartInput,
  ): Promise<PatchPartOutput> {
    return this.partService.patchPart(createPartData);
  }

  @Delete(':partId')
  async deletePart(
    @Param('partId') deletedPartData: DeletePartInput,
  ): Promise<DeletePartOutput> {
    return this.partService.deletePart(deletedPartData);
  }
}
