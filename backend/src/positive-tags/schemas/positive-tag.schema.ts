import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { randomUUID } from 'crypto';

export type PositiveTagDocument = HydratedDocument<PositiveTag>;

@Schema()
export class PositiveTag {
  @Prop({ type: String, default: () => randomUUID() })
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  color: string;
}

export const PositiveTagSchema = SchemaFactory.createForClass(PositiveTag);
