import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDevice } from '../../user-devices/entities/user.devices.entity';

@Entity('device_info_connectlab')
export class DeviceInfo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  mac_address: string;

  @Column()
  virtual_id: string;

  @Column()
  ip_address: string;

  @Column()
  signal: string;

  @OneToOne(() => UserDevice, (device) => device.id)
  @JoinColumn({ name: 'user_device_id' })
  user_device_id: UserDevice;
}
