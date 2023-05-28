import { Module } from '@nestjs/common';
import { PartController } from './part.controller';
import { PartService } from './part.service';
import { PartRepository } from './part.repository';
import { TypeOrmExModule } from 'src/core/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PartRepository])],
  providers: [PartService],
  controllers: [PartController],
})
export class PartModule {}
