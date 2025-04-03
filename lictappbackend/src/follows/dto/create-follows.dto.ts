import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateFollowDto {
  @IsNotEmpty()
  @IsMongoId()
  opportunityId: string;
}
