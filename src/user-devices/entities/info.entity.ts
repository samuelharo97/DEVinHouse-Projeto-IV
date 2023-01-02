import { randomBytes } from 'crypto';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDevice } from './user.devices.entity';

@Entity('device_info_connectlab')
export class DeviceInfo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true, default: 'XX:XX:XX:XX:XX:XX' })
  mac_address: string;

  @Column({ default: 'abcd123' })
  virtual_id: string;

  @Column({ default: '127.0.0.1' })
  ip_address: string;

  @Column({ nullable: true })
  signal: string;

  @OneToOne(() => UserDevice, (device) => device.info, { onDelete: 'CASCADE' })
  user_device_id: UserDevice;

  addMAC() {
    const macAddress = 'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
      return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
    }); // taken from https://stackoverflow.com/questions/24621721/how-would-one-generate-a-mac-address-in-javascript
    return macAddress;
  }

  addVirtual() {
    const virtualID = randomBytes(3).toString('hex');
    return virtualID;
  }
}
