import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Address } from 'src/user/entities/address.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CredentialsDTO } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepo: Repository<User>,
    private addressRepo: Repository<Address>,
  ) {}

  createUser(createUser: CreateUserDto): Promise<User> {
    return new Promise(async (resolve) => {
      const { fullName, email, photoUrl, phone, userAddress, password } =
        createUser;
      const newUser = this.userRepo.create();

      newUser.fullName = fullName;
      newUser.email = email;
      newUser.photoUrl = photoUrl;
      newUser.phone = phone;
      newUser.salt = await bcrypt.genSalt(12);
      newUser.password = await this.hashPassword(password, newUser.salt);
      newUser.userAddress.city = userAddress.city;
      newUser.userAddress.zipCode = userAddress.zipCode;
      newUser.userAddress.neighborhood = userAddress.neighborhood;
      newUser.userAddress.number = userAddress.number;
      newUser.userAddress.street = userAddress.street;
      newUser.userAddress.state = userAddress.state;
      newUser.userAddress.complement = userAddress.complement;

      const user = await this.userRepo.save(newUser);
      delete user.password;
      delete newUser.salt;

      resolve(user);
    });
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.createUser(createUserDto);
  }

  async signIn(credentials: CredentialsDTO) {
    const user = await this.checkCredentials(credentials);
    if (user === null) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos');
    }

    const jwtPayload: JwtPayloadUser = {
      id: user.id,
      name: user.fullName,
      email: user.email,
    };
    const token = await this.jwtService.sign(jwtPayload);
    return { token };
  }

  async checkCredentials(credentials: CredentialsDTO) {
    const { email, password } = credentials;
    const user = await this.userRepo.findOne({
      where: {
        email: email,
      },
    });

    if (user && (await user.checkPassword(password))) {
      return user;
    }
    return null;
  }

  validateToken(jwtToken: string) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await this.jwtService.verifyAsync(jwtToken, {
            ignoreExpiration: false,
          }),
        );
      } catch (error) {
        reject({
          code: 401,
          detail: 'JWT expired.',
        });
      }
    });
  }
}
