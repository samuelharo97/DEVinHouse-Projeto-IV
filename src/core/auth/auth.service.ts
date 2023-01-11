import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Address } from 'src/user/entities/address.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CredentialsDTO } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';
import { ChangePasswordDto } from 'src/user/dto/change-password.dto';

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
      newUser.devices = [];

      const user = await this.userRepo.save(newUser);
      await this.addressRepo.save(newAddress);
      delete user.password;
      delete newUser.salt;

      resolve({ message: `Well done. Your account was created.` });
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
      throw new UnauthorizedException('E-mail and/or password are incorrect');
    }

    if (user.is_active === false) {
      throw new UnauthorizedException('account was suspended or banned');
    }

    const jwtPayload: JwtPayloadUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      photoUrl: user.photoUrl,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token, user };
  }

  async checkCredentials(credentials: CredentialsDTO) {
    const { email, password } = credentials;
    const user = await this.userRepo.findOne({
      where: {
        email: email,
        is_active: true,
      },
      relations: {
        userAddress: true,
      },
    });

    if (user && (await user.checkPassword(password))) {
      delete user.password;
      delete user.salt;
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

  verifyUser(requestId: string, userId: string) {
    if (requestId != userId) {
      throw new UnauthorizedException({
        success: false,
        message:
          'Error: The user in the request does not match the logged-in user.',
      });
    }
    return;
  }

  async modifyPassword(changePasswordDto: ChangePasswordDto) {
    const { email, old_password, new_password } = changePasswordDto;
    const credentials = { email, password: old_password };

    const user = await this.checkCredentials(credentials);

    if (!user) {
      throw new UnauthorizedException('E-mail and/or password are incorrect');
    }

    user.salt = await bcrypt.genSalt(12);
    user.password = await this.hashPassword(new_password, user.salt);

    await this.userRepo.save(user);

    delete user.password;
    delete user.salt;

    return { message: `Password has been changed` };
  }
}
