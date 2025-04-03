import { Module } from '@nestjs/common';
import { TypeopportunitiesService } from './typeopportunities.service';
import { TypeopportunitiesController } from './typeopportunities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TypeOpportunity,
  TypeOpportunitySchema,
} from 'schemas/typeopportunity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TypeOpportunity.name,
        schema: TypeOpportunitySchema,
      },
    ]),
  ],
  controllers: [TypeopportunitiesController],
  providers: [TypeopportunitiesService],
  exports: [TypeopportunitiesService],
})
export class TypeopportunitiesModule {}
