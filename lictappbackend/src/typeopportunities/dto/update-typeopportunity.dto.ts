import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeopportunityDto } from './create-typeopportunity.dto';

export class UpdateTypeopportunityDto extends PartialType(CreateTypeopportunityDto) {}
