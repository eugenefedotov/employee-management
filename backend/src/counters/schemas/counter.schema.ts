import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CounterDocument = HydratedDocument<Counter>;

@Schema()
export class Counter {
  /**
   * Название последовательности, например "negativeTagId".
   * Используется как _id документа вместо стандартного MongoDB ObjectId.
   */
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ default: 0 })
  seq: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
