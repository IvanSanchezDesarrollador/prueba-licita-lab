import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeopportunitiesService } from './typeopportunities.service';
import { CreateTypeopportunityDto } from './dto/create-typeopportunity.dto';
import { UpdateTypeopportunityDto } from './dto/update-typeopportunity.dto';

@Controller('typeopportunities')
export class TypeopportunitiesController {
  constructor(private readonly typeopportunitiesService: TypeopportunitiesService) {}

  @Post('create')
  create(@Body() objectType: CreateTypeopportunityDto) {
    return this.typeopportunitiesService.create(objectType);
  }

  @Get('all')
  findAll() {
    return this.typeopportunitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeopportunitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeopportunityDto: UpdateTypeopportunityDto) {
    return this.typeopportunitiesService.update(+id, updateTypeopportunityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeopportunitiesService.remove(+id);
  }
}
