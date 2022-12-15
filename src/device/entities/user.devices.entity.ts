import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from './device.entity';
import { DeviceInfo } from './info.entity';
import { DeviceSettings } from './settings.entity';

@Entity('user_device_connectlab')
export class UserDevice {
  @PrimaryGeneratedColumn('uuid')
  @OneToOne(() => DeviceSettings, (settings) => settings.user_device_id, {
    onDelete: 'CASCADE',
  })
  @OneToOne(() => DeviceInfo, (info) => info.user_device_id)
  id: string;

  @Column()
  user_id: string;

  @Column()
  @ManyToOne(() => Device, (device) => device._id, { onDelete: 'SET NULL' })
  device_id: Device[];

  @Column()
  settings_id: string;

  @Column()
  info_id: string;
}
