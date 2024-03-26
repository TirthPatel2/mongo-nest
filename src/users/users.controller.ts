import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { mongo } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  //   @UsePipes(new ValidationPipe())  //local validation pipe
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const isvalidId: boolean = mongo.ObjectId.isValid(id);
    if (!isvalidId) {
      throw new HttpException('Invalid Id', 400);
    }
    const user = await this.usersService.getUserByID(id);
    return user;
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isvalidId: boolean = mongo.ObjectId.isValid(id);
    if (!isvalidId) {
      throw new HttpException('Invalid Id', 400);
    }
    return await this.usersService.updateUser(id, updateUserDto);
  }
}
