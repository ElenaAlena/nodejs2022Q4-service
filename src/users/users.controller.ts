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
    const user = this.userService.find(id);
    if (user) return new UserEntity(user as User);
    throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserPasswordDto,
  ): Promise<User> {
    const userUpdated = await this.userService.update(id, updateUser);
    return new UserEntity(userUpdated);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const userToDelete = await this.userService.remove(id);
    if (!userToDelete) {
      throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
    }
    return userToDelete;
  }
}
