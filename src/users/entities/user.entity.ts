import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';
import { v4 } from 'uuid';

export class UserEntity {
  @IsUUID()
  @IsNotEmpty()
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  @Exclude()
  password: string;

  constructor({ login, password }: CreateUserDto) {
    this.id = v4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
