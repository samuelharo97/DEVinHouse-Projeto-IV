import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('device_connectlab')
export class Device {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  madeBy: string;

  @Column()
  photoUrl: string;
}
