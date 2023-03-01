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
  UseGuards,
} from '@nestjs/common';

import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import User from './interfaces/user.interface';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.login && createUserDto.password) {
      const newUser = await this.userService.create(createUserDto);
      return newUser;
    }
    throw new HttpException(
      'Login or password is incorrect',
      HttpStatus.BAD_REQUEST,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ): Promise<User> {
    const user = await this.userService.findOne(id);
    if (user) return user;
    throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
    @Body() updateUser: UpdateUserPasswordDto,
  ): Promise<User> {
    const userUpdated = await this.userService.update(id, updateUser);
    return userUpdated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const userToDelete = await this.userService.remove(id);
    if (!userToDelete) {
      throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
    }
    return userToDelete;
  }
}
