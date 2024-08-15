import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@user/entity/user.entity';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { ILogin } from '@auth/interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.userRepo.findOne({ where: { phone: username } });
    if (user) {
      const isPasswordMatch = await argon2.verify(user.password, password);
      if (isPasswordMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login({ user }: { user: Omit<UserEntity, 'password'> }) {
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        phone: user.phone,
        fullName: user.fullName,
      }),
      user,
    };
  }
}
