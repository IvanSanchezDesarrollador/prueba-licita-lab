import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTypeopportunityDto {
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
