import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'address_connectlab' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.userAddress)
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
