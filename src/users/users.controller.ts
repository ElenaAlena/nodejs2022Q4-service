import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  Put,
  HttpCode,
  HttpStatus,
  ClassSerializerInterceptor,
  HttpException,
} from '@nestjs/common';

import { validate } from 'uuid';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import User from './interfaces/user.interface';
import { UserEntity } from './entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.login && createUserDto.password) {
      const newUser = await this.userService.create(createUserDto);
      return new UserEntity(newUser);
    }
    throw new HttpException(
      'Login or password is incorrect',
      HttpStatus.BAD_REQUEST,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[] | User> {
    return this.userService.find();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User | User[]> {
    if (!validate(id)) {
      throw new HttpException('User id is not valid', HttpStatus.BAD_REQUEST);
    }
    return this.userService.find(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserPasswordDto,
  ): Promise<User> {
    if (!validate(id)) {
      throw new HttpException('User id is not valid', HttpStatus.BAD_REQUEST);
    }
    const userUpdated = await this.userService.update(id, updateUser);
    return new UserEntity(userUpdated);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    if (!validate(id)) {
      throw new HttpException('User id is not valid', HttpStatus.BAD_REQUEST);
    }
    const userToDelete = this.userService.remove(id);
    if (!userToDelete) {
      throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
    }
    return userToDelete;
  }
}
