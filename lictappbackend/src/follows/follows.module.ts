import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowController } from './follows.controller';
import { FollowService } from './follows.service';
import { Follow, FollowSchema } from 'schemas/follow.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService, MongooseModule],
})
export class FollowModule {}
