import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserEntity } from './entities/user.entity';
import User from './interfaces/user.interface';

@Injectable()
export class UserService {
  private _users: User[] = [];

  async create(user: CreateUserDto): Promise<User> {
    const newUser: UserEntity = new UserEntity(user);
    this._users.push(newUser);
    return newUser;
  }

  find(id?: string): User[] | User {
    if (id) {
      return this._users.find((user) => user.id === id);
    }
    return this._users;
  }

  async update(id: string, newCreds: UpdateUserPasswordDto): Promise<User> {
    if (!newCreds.newPassword || !newCreds.oldPassword) {
      throw new HttpException(
        'Recied data is not correct',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.find(id) as User;
    if (!user) {
      throw new HttpException('There is no such user', HttpStatus.NOT_FOUND);
    }

    if (user.password !== newCreds.oldPassword) {
      throw new HttpException('Password is not correct', HttpStatus.FORBIDDEN);
    }
    user.version++;
    user.updatedAt = Date.now();
    user.password = newCreds.newPassword;
    return user;
  }

  async remove(id: string): Promise<User | boolean> {
    const user = !!this.find(id);
    if (user) {
      this._users = this._users.filter((item) => item.id !== id);
      return true;
    }
    return false;
  }
}
