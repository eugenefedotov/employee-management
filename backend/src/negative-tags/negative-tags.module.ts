import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NegativeTag, NegativeTagSchema } from './schemas/negative-tag.schema';
import { NegativeTagsService } from './negative-tags.service';
import { NegativeTagsController } from './negative-tags.controller';
import { CountersModule } from '../counters/counters.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NegativeTag.name, schema: NegativeTagSchema },
    ]),
    CountersModule,
  ],
  controllers: [NegativeTagsController],
  providers: [NegativeTagsService],
})
export class NegativeTagsModule {}
