import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
    @Inject('USER_REPOSITORY')
    private userRepo: Repository<User>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepo: Repository<Address>,
  ) {}

  createUser(createUser: CreateUserDto): Promise<any> {
    return new Promise(async (resolve) => {
      const { fullName, email, photoUrl, phone, userAddress, password } =
        createUser;

      const newUser = this.userRepo.create();
      const newAddress = this.addressRepo.create();

      newUser.fullName = fullName;
      newUser.email = email;
      newUser.photoUrl = photoUrl || newUser.photoUrl;
      newUser.phone = phone;
      newUser.salt = await bcrypt.genSalt(12);
      newUser.password = await this.hashPassword(password, newUser.salt);
      newUser.userAddress = newAddress;
      newAddress.city = userAddress.city;
      newAddress.zipCode = userAddress.zipCode;
      newAddress.neighborhood = userAddress.neighborhood;
      newAddress.number = userAddress.number;
      newAddress.street = userAddress.street;
      newAddress.state = userAddress.state;
      newAddress.complement = userAddress.complement;

      const user = await this.userRepo.save(newUser);
      await this.addressRepo.save(newAddress);
      delete user.password;
      delete newUser.salt;

      resolve({ user });
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

  decodedToken(jwtToken: string) {
    return this.jwtService.decode(jwtToken);
  }
}
