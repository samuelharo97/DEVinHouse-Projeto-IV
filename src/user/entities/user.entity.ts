import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Address } from './address.entity';

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

  @OneToOne(() => Address, (address) => address.user)
  userAddress: Address;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
