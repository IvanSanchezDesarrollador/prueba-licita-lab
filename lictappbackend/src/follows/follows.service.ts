import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Follow, FollowDocument } from 'schemas/follow.schema';
import { CreateFollowDto } from './dto/create-follows.dto';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
  ) {}

  async followOpportunity(
    userId: string,
    objectFollow: CreateFollowDto,
  ): Promise<FollowDocument> {
    return this.followModel.create({
      user: userId,
      opportunity: objectFollow.opportunityId,
      is_followed: true,
    });
  }

  async unfollowOpportunity(
    userId: string,
    opportunityId: string,
  ): Promise<FollowDocument | null> {
    return this.followModel.findOneAndDelete({
      user: userId,
      opportunity: opportunityId,
    });
  }

  async getFollowedOpportunities(userId: string): Promise<FollowDocument[]> {
    return this.followModel.find({ user: userId }).populate('opportunity');
  }
}
