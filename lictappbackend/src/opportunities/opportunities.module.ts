import { Module } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { OpportunitiesController } from './opportunities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Opportunity, OpportunitySchema } from 'schemas/opportunity.schema';
import { FollowModule } from 'src/follows/follows.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Opportunity.name,
        schema: OpportunitySchema,
      },
    ]),
    FollowModule,
    AuthModule,
    ConfigModule,
  ],
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService],
  exports: [OpportunitiesService],
})
export class OpportunitiesModule {}
