import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PositiveTag, PositiveTagSchema } from './schemas/positive-tag.schema';
import { PositiveTagsService } from './positive-tags.service';
import { PositiveTagsController } from './positive-tags.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PositiveTag.name, schema: PositiveTagSchema },
    ]),
  ],
  controllers: [PositiveTagsController],
  providers: [PositiveTagsService],
})
export class PositiveTagsModule {}
