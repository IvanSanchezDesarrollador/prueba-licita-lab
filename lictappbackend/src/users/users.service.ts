import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  
  async register(userObject: RegisterUserDto): Promise<UserDocument> {
    const { password } = userObject;
    const hashPassword = await hash(password as string, 10);
    userObject = { ...userObject, password: hashPassword };
    return this.userModel.create(userObject);
  }

  
}
