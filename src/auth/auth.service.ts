import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginResponse } from './loginResponseType';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  getTokens(payload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
    const password = await hash(
      createUserDto.password,
      parseInt(process.env.CRYPT_SALT),
    );
    const user = this.usersRepository.create({ ...createUserDto, password });
    return this.usersRepository.save(user);
  }

  async login(user: CreateUserDto): Promise<LoginResponse> {
    const userExist: UserEntity = await this.usersRepository.findOne({
      where: { login: user.login },
    });
    if (!userExist) {
      throw new ForbiddenException('Login or password is incorrect');
    }
    const isPasswordCorrect = await compare(user.password, userExist.password);

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Login or password is incorrect');
    }
    return this.getTokens({ login: userExist.login, userId: userExist.id });
  }

  async refresh(refreshToken: string): Promise<LoginResponse> {
    try {
      const tokenData = this.jwtService.verify(refreshToken);
      const user: UserEntity = await this.usersRepository.findOne({
        where: { id: tokenData.userId },
      });
      if (!user) {
        throw new ForbiddenException('The refreshToken is invalid');
      }
      const payload = { login: tokenData.login, userId: tokenData.id };
      return this.getTokens(payload);
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
}
