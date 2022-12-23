import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Local } from '../../device/enum/location.enum';
import { UserDevice } from './user.devices.entity';

@Entity('device_settings_connectlab')
export class DeviceSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserDevice, (device) => device.id)
  @JoinColumn({ name: 'user_device_id' })
  user_device_id: UserDevice;

  @Column({ default: false })
  is_on: boolean;

  @Column({ length: 15 })
  room: string;

  @Column()
  location: Local;
}
