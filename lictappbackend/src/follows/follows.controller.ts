import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follows.service';
import { IUser } from 'src/auth/interface/auth.interface ';
import { CreateFollowDto } from './dto/create-follows.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async follow(
    @Req() req: { user: IUser },
    @Body() objectFollow: CreateFollowDto,
  ) {
    return this.followService.followOpportunity(req.user.id, objectFollow);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async unfollow(
    @Req() req: { user: IUser },
    @Param('id') opportunityId: string,
  ) {
    return this.followService.unfollowOpportunity(req.user.id, opportunityId);
  }

  @Get()
  async getFollowed(@Req() req: { user: IUser }) {
    return this.followService.getFollowedOpportunities(req.user.id);
  }
}
