import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './follows/follows.module';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { TypeopportunitiesModule } from './typeopportunities/typeopportunities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/lictappdb'),
    AuthModule,
    FollowModule,
    TypeopportunitiesModule,
    OpportunitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
