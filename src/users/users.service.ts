import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserEntity } from './entities/user.entity';
import User from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: string, newCreds: UpdateUserPasswordDto): Promise<User> {
    if (!newCreds.newPassword || !newCreds.oldPassword) {
      throw new HttpException(
        'Recied data is not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('There is no such user', HttpStatus.NOT_FOUND);
    }

    if (user.password !== newCreds.oldPassword) {
      throw new HttpException('Password is not correct', HttpStatus.FORBIDDEN);
    }
    await this.usersRepository.save({
      id: id,
      password: newCreds.newPassword,
    });
    return await this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.usersRepository.delete({ id: id });
    return result.affected ? result.raw : null;
  }
}
