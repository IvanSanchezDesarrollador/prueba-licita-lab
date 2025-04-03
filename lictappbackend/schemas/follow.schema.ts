import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type FollowDocument = HydratedDocument<Follow>;

@Schema()
export class Follow {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Opportunity', required: true })
  opportunity: Types.ObjectId;

  @Prop({ default: true })
  is_followed: boolean;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
