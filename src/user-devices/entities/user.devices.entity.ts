import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeviceInfo } from './info.entity';
import { DeviceSettings } from './settings.entity';

@Entity('user_device_connectlab')
export class UserDevice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  user_id: string;

  @Column('jsonb', { unique: false })
  device: object;

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
