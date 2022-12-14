import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.userAddress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false })
  zipCode: string;

  @Column({ nullable: false })
  street: string;

  @Column('int', { nullable: false })
  number: number;

  @Column({ nullable: false })
  neighborhood: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: true })
  complement?: string;
}
