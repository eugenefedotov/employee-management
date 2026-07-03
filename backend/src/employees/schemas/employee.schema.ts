import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Office } from '../enums/office.enum';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, enum: Office, required: true })
  office: Office;

  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: [String], default: [] })
  positiveTagIds: string[];

  @Prop({ type: [Number], default: [] })
  negativeTagIds: number[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
