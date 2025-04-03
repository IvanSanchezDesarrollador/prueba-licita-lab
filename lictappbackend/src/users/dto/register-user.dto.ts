import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';

export class RegisterUserDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
