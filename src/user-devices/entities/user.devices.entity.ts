import { Device } from 'src/device/entities/device.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeviceInfo } from './info.entity';
import { DeviceSettings } from './settings.entity';

@Entity('user_device_connectlab')
export class UserDevice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user' })
  user: string;

  @Column('jsonb', { unique: false })
  device: Device;

  @OneToOne(() => DeviceSettings, (settings) => settings.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'settings_id' })
  settings: DeviceSettings;

  @OneToOne(() => DeviceInfo, (info) => info.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'info_id' })
  info: DeviceInfo;
}
