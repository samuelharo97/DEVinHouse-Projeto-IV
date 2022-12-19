import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserDevice } from './user.devices.entity';

@Entity('device_connectlab')
export class Device {
  @PrimaryGeneratedColumn('increment')
  @OneToMany(() => UserDevice, (userDevice) => userDevice.device_id)
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
