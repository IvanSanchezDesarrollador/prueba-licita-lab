import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @MaxLength(30)
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @MaxLength(50)
  @IsNotEmpty()
  password: string;
}
