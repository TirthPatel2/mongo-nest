import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);

    return await newUser.save();
  }

  async getUsers() {
    return await this.userModel.find();
  }

  async getUserByID(id: string) {
    const found = await this.userModel.findById(id);
    if (!found) {
      throw new NotFoundException('user Not Found');
    }
    return found;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const found = await this.userModel.findById(id);
    if (!found) {
      throw new NotFoundException('user Not Found');
    }
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }
}
