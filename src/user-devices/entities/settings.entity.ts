import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Local } from '../enum/location.enum';
import { UserDevice } from './user.devices.entity';

@Entity('device_settings_connectlab')
export class DeviceSettings {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => UserDevice, (device) => device.settings, {
    onDelete: 'CASCADE',
  })
  user_device_id: UserDevice;

  @Column({ default: false })
  is_on: boolean;

  @Column({ length: 15 })
  room: string;

  @Column()
  location: Local;
}
