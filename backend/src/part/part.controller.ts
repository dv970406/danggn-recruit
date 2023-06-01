import { Controller, Get } from '@nestjs/common';
import { PartService } from './part.service';
import { GetPartsOutput } from './dtos/gets.dto';

@Controller('part')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Get()
  getParts(): Promise<GetPartsOutput> {
    return this.partService.getParts();
  }

  // @Get(':partId')
  // async getPart(@Param('partId') partId: string): Promise<GetPartOutput> {
  //   return this.partService.getPart(partId);
  // }

  // @Post()
  // async createPart(
  //   @Body() createPartData: CreatePartInput,
  // ): Promise<CreatePartOutput> {
  //   return this.partService.createPart(createPartData);
  // }

  // @Patch()
  // async patchPart(
  //   @Body() createPartData: PatchPartInput,
  // ): Promise<PatchPartOutput> {
  //   return this.partService.patchPart(createPartData);
  // }

  // @Delete(':partId')
  // async deletePart(
  //   @Param('partId') deletedPartData: DeletePartInput,
  // ): Promise<DeletePartOutput> {
  //   return this.partService.deletePart(deletedPartData);
  // }
}
