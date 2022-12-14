import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  fullName: string;

  @Column({ length: 75, unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
