import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Address } from './address.entity';
import { UserDevice } from 'src/user-devices/entities/user.devices.entity';

@Entity({ name: 'user_connectlab' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  fullName: string;

  @Column({ length: 75, unique: true, nullable: false })
  email: string;

  @Column({
    default: 'https://connectlab.netlify.app/profile.png',
  })
  photoUrl: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: false, default: true })
  is_active: boolean;

  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  userAddress: Address;

  @OneToMany(() => UserDevice, (userDevice) => userDevice.user, {
    onDelete: 'CASCADE',
  })
  devices: UserDevice[];

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  addUserDevice(userDevice: UserDevice) {
    if (!this.devices) {
      this.devices = new Array<UserDevice>();
    }
    this.devices.push(userDevice);
  }
}
