import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NegativeTagDocument = HydratedDocument<NegativeTag>;

@Schema()
export class NegativeTag {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  color: string;
}

export const NegativeTagSchema = SchemaFactory.createForClass(NegativeTag);
