import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateOpportunityDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsMongoId()
  type: string;

  @IsNotEmpty()
  publish_date: string;

  @IsNotEmpty()
  close_date: string;
}
