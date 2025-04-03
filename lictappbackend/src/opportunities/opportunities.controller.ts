import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { IUser } from 'src/auth/interface/auth.interface ';

@Controller('opportunity')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get('all')
  async all(@Query('search') search?: string) {
    return this.opportunitiesService.allOpportunities(search);
  }

  @Delete(':id')
  async deleteOpp(@Param('id') userId: string) {
    return this.opportunitiesService.deleteOpportunity(userId);
  }

  @Post('create')
  async create(@Body() objetcOpportunity: CreateOpportunityDto) {
    return this.opportunitiesService.create(objetcOpportunity);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async OpportunityUser(
    @Req() req: { user: IUser },
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('type') type?: string,
  ) {
    return this.opportunitiesService.getOpportunitiesForUser(
      req.user.id,
      startDate,
      endDate,
      type,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async OpportunityNoUser(
    @Req() req: { user: IUser },
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('type') type?: string,
  ) {
    return this.opportunitiesService.getOpportunitiesNotFollowed(
      req.user.id,
      startDate,
      endDate,
      type,
    );
  }
}
