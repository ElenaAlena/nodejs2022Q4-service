import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

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

  constructor(user: Partial<UserEntity>) {
    Object.assign(this, user);
  }
}
