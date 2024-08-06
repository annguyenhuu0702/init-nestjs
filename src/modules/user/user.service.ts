import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@user/entity/user.entity';
import { map, omit } from 'lodash';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  async createUser({ fullName, password, phone, thumbnail }) {
    const existingUser = await this.userRepo.findOne({
      where: {
        phone,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User with this phone number already exists');
    }
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
    });
    const data = await this.userRepo.save({
      fullName,
      password: hash,
      phone,
      thumbnail,
    });

    return {
      message: 'User created successfully',
      data: omit(data, 'password'),
    };
  }

  async getUsers() {
    const data = await this.userRepo.find({
      order: {
        createdAt: 'desc',
      },
    });
    const users = map(data, (user) => omit(user, 'password'));
    return {
      data: users,
      message: 'Users fetched successfully',
    };
  }

  async getUserById(id: string) {
    const data = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    return {
      data: omit(data, 'password'),
      message: 'User fetched successfully',
    };
  }

  async updateUser({
    id,
    fullName,
    phone,
    thumbnail,
  }: {
    id: string;
    fullName: string;
    phone: string;
    thumbnail: string;
  }) {
    const existingUser = await this.userRepo.findOne({
      where: {
        phone,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User with this phone number already exists');
    }
    await this.userRepo.update(
      {
        id,
      },
      {
        fullName,
        phone,
        thumbnail,
      },
    );
    return {
      message: 'User updated successfully',
    };
  }
}
