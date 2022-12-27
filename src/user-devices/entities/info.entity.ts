import { randomBytes } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDevice } from './user.devices.entity';

@Entity('device_info_connectlab')
export class DeviceInfo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  mac_address: string;

  @Column({ default: 'abcd123' })
  virtual_id: string;

  @Column({ default: '127.0.0.1' })
  ip_address: string;

  @Column({ default: '-40dBm' })
  signal: string;

  @OneToOne(() => UserDevice, (device) => device.id)
  @JoinColumn({ name: 'user_device_id' })
  user_device_id: UserDevice;

  generateMAC() {
    if (this.mac_address == null) {
      const macAddress = 'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
        return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
      });
      this.mac_address = macAddress;
    }
  }
}
