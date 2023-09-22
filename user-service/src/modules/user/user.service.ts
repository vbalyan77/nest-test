import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.schema';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const passwordSalt: string = crypto.randomBytes(16).toString('hex');
    const hashedPassword: string = crypto
      .pbkdf2Sync(createUserDto.password, passwordSalt, 1000, 64, `sha512`)
      .toString(`hex`);

    createUserDto.password = hashedPassword;
    const user: User = (
      await this.userModel.create({ ...createUserDto, passwordSalt })
    ).toObject();

    delete user.password;
    delete user.passwordSalt;

    return user;
  }
  findAll() {
    return this.userModel.find().exec();
  }
  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findUserByUsername(username: string): Promise<User> {
    console.log({ username });
    const user: User = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
