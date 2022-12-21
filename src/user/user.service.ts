import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Address } from './entities/address.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepo: Repository<User>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepo: Repository<Address>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const users = await this.userRepo.find({
      relations: {
        userAddress: true,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        photoUrl: true,
        phone: true,
      },
    });
    const filteredUsers = users.map((user) => {
      if (!user.phone) {
        delete user.phone;
      }
      return user;
    });
    return filteredUsers;
  }

  findOne(param: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepo.findOneBy({
          id: param,
        });

        if (!user.phone) {
          delete user.phone;
        }

        resolve(user);
      } catch (error) {
        resolve(console.log(error));
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
