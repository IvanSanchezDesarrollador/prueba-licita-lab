import { Controller, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async loginUser(@Body() objectLogin: LoginAuthDto, @Res() res: Response) {
    const data = await this.authService.login(objectLogin);

    res.setHeader('Authorization', `Bearer ${data.access_token}`);
    return res.status(HttpStatus.OK).json({ message: 'Login successful' });
  }

  @Post('logout')
  logoutUser(@Res() res: Response) {
    res.setHeader('Authorization', ''); // Borra el header de Authorization
    return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }
}
