import { Injectable } from '@nestjs/common';
import { CreateTypeopportunityDto } from './dto/create-typeopportunity.dto';
import { UpdateTypeopportunityDto } from './dto/update-typeopportunity.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  TypeOpportunity,
  TypeOpportunityDocument,
} from 'schemas/typeopportunity.schema';
import { Model } from 'mongoose';

@Injectable()
export class TypeopportunitiesService {
  constructor(
    @InjectModel(TypeOpportunity.name)
    private TypeOpportunityModel: Model<TypeOpportunityDocument>,
  ) {}

  async create(
    objetType: CreateTypeopportunityDto,
  ): Promise<TypeOpportunityDocument> {
    return this.TypeOpportunityModel.create(objetType);
  }

  findAll(): Promise<TypeOpportunityDocument[]> {
    return this.TypeOpportunityModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} typeopportunity`;
  }

  update(id: number, updateTypeopportunityDto: UpdateTypeopportunityDto) {
    return `This action updates a #${id} typeopportunity`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeopportunity`;
  }
}
