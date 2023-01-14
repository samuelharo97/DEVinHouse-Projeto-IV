import { Device } from 'src/device/entities/device.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFile } from 'fs/promises';

export class seeds1673291193057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const seeds: Device[] = JSON.parse(
      await readFile('src/core/database/seeds/devices.json', 'utf8'),
    );

    seeds.forEach(async (device) => {
      await queryRunner.query(
        `
        INSERT INTO device_connectlab ("name", "type", "madeBy", "photoUrl")
        VALUES ('${device.name}', '${device.type}', '${device.madeBy}', '${device.photoUrl}');
        `,
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM device_connectlab`);
  }
}
