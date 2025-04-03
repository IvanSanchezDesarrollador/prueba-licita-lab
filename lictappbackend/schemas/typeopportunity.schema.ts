import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TypeOpportunityDocument = Document & TypeOpportunity;

@Schema()
export class TypeOpportunity {
  @Prop({ required: true, unique: true })
  name: string;
}

export const TypeOpportunitySchema = SchemaFactory.createForClass(TypeOpportunity);


