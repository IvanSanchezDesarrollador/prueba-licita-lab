import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from 'schemas/user.schema';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { IUser } from 'src/auth/interface/auth.interface ';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  registerUser(@Body() objecUser: RegisterUserDto) {
    return this.usersService.register(objecUser);
  }

  

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: IUser }): string {
    return req.user.id;
  }
}
