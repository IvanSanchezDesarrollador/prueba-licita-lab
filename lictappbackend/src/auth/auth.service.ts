import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IDataLoginToken } from './interface/auth.interface ';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtServive: JwtService,
  ) {}

  async login(objectLogin: LoginAuthDto): Promise<IDataLoginToken> {
    const { email, password } = objectLogin;
    const findUser = await this.userModel.findOne({ email });

    if (!findUser) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) {
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      role:findUser.role
    };

    const token = await this.jwtServive.signAsync(payload);

    const data: IDataLoginToken = {
      access_token: token,
    };

    return data;
  }
}
