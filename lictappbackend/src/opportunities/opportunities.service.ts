import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Opportunity, OpportunityDocument } from 'schemas/opportunity.schema';
import { Model, Types } from 'mongoose';
import { Follow, FollowDocument } from 'schemas/follow.schema';

@Injectable()
export class OpportunitiesService {
  constructor(
    @InjectModel(Opportunity.name)
    private opportunityModel: Model<OpportunityDocument>,
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
  ) {}

  async allOpportunities(search?: string) {
    const filter = search ? { title: { $regex: search, $options: 'i' } } : {};
    return await this.opportunityModel.find(filter).populate('type').exec();
  }

  async create(
    objetcOpportunity: CreateOpportunityDto,
  ): Promise<OpportunityDocument> {
    const publishDate = new Date(objetcOpportunity.publish_date);
    const closeDate = new Date(objetcOpportunity.close_date);

    const newOpportunity = new this.opportunityModel({
      ...objetcOpportunity,
      publish_date: publishDate,
      close_date: closeDate,
    });

    const nameOpp = await this.opportunityModel
      .findOne({ title: objetcOpportunity.title.trim() })
      .exec();

    if (nameOpp) {
      throw new HttpException('Opportunity exists', HttpStatus.CONFLICT);
    }

    await newOpportunity.save();

    const savedOpportunity = await this.opportunityModel
      .findById(newOpportunity._id)
      .populate('type');

    if (!savedOpportunity) {
      throw new HttpException(
        'Opportunity could not be found after save',
        HttpStatus.NOT_FOUND,
      );
    }

    return savedOpportunity;
  }

  async getOpportunitiesForUser(
    userId: string,
    startDate?: string,
    endDate?: string,
    type?: string,
  ): Promise<Opportunity[]> {
    const followedOpportunities = await this.followModel.find({
      user: userId,
      is_followed: true,
    });
    const followedOpportunityIds = followedOpportunities.map((follow) =>
      follow.opportunity.toString(),
    );

    const query: {
      _id: { $in: string[] };
      publish_date?: { $gte: Date; $lte: Date };
      type?: string;
    } = {
      _id: { $in: followedOpportunityIds },
    };

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && isNaN(start.getTime())) {
      throw new Error('Invalid start date');
    }

    if (end && isNaN(end.getTime())) {
      throw new Error('Invalid end date');
    }

    if (start && end) {
      query.publish_date = { $gte: start, $lte: end };
    }

    if (type) {
      query.type = type;
    }

    const opportunities = await this.opportunityModel
      .find(query)
      .populate('type')
      .exec();

    return opportunities;
  }

  async getOpportunitiesNotFollowed(
    userId: string,
    startDate?: string,
    endDate?: string,
    type?: string,
  ): Promise<Opportunity[]> {
    const followedOpportunities = await this.followModel.find({
      user: userId,
      is_followed: true,
    });

    const followedOpportunityIds = followedOpportunities.map((follow) =>
      follow.opportunity.toString(),
    );

    const now = new Date(new Date().toISOString());

    const query: {
      _id: { $nin: string[] };
      close_date: { $gte: Date };
      publish_date?: { $gte: Date; $lte: Date };
      type?: string;
    } = {
      _id: { $nin: followedOpportunityIds },
      close_date: { $gte: now },
    };

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && isNaN(start.getTime())) {
      throw new Error('Invalid start date');
    }

    if (end && isNaN(end.getTime())) {
      throw new Error('Invalid end date');
    }

    if (start && end) {
      query.publish_date = { $gte: start, $lte: end };
    }

    if (type) {
      query.type = type;
    }

    const opportunities = await this.opportunityModel
      .find(query)
      .populate('type')
      .exec();

    return opportunities;
  }

  async deleteOpportunity(opportunityId: string) {
    const result = await this.opportunityModel.deleteOne({
      _id: opportunityId,
    });

    if (result.deletedCount === 0) {
      throw new HttpException('Opportunity not found', HttpStatus.NOT_FOUND);
    }

    return { message: 'Opportunity deleted successfully' };
  }
}
