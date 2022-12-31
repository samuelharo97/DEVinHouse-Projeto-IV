import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeviceInfo } from './info.entity';
import { DeviceSettings } from './settings.entity';

@Entity('user_device_connectlab')
export class UserDevice {
  @PrimaryGeneratedColumn('uuid')
  @ManyToOne(() => User, (user) => user.devices)
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

  /* addDevice(device: any) {
    if (this.device == null) {
      this.device = new Array<Device>();
    }
    this.device.push(device);
  } */
}
