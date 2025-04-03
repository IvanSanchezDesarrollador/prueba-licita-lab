import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, HydratedDocument } from 'mongoose';

export type OpportunityDocument = HydratedDocument<Opportunity>;

@Schema()
export class Opportunity {
  @Prop({ unique: true })
  code: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'TypeOpportunity' })
  type: Types.ObjectId;

  @Prop({ required: true })
  publish_date: Date;

  @Prop({ required: true })
  close_date: Date;
}

export const OpportunitySchema = SchemaFactory.createForClass(Opportunity);

OpportunitySchema.pre<OpportunityDocument>('save', async function (next) {
  console.log('Running pre-save hook...');
  if (!this.code) {
    const year = new Date().getFullYear().toString().slice(-2);
    const count = await this.model('Opportunity').countDocuments();
    const sequence = (count + 1).toString().padStart(2, '0');
    this.code = `L1-${sequence}-${year}`;
    console.log('Generated code:', this.code);
  }
  next();
});
