import { MigrationInterface, QueryRunner } from 'typeorm';

export class connectlab1673141441832 implements MigrationInterface {
  name = 'connectlab1673141441832';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "device_connectlab" ("_id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "madeBy" character varying NOT NULL, "photoUrl" character varying NOT NULL, CONSTRAINT "PK_8b868761a80719b172878b3f723" PRIMARY KEY ("_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address_connectlab" ("id" SERIAL NOT NULL, "zipCode" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "neighborhood" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "complement" character varying, CONSTRAINT "PK_957df54df820d7d9723edb03461" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_connectlab" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying(100) NOT NULL, "email" character varying(75) NOT NULL, "photoUrl" character varying NOT NULL DEFAULT 'https://connectlab.netlify.app/profile.png', "phone" character varying, "password" character varying NOT NULL, "salt" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "address_id" integer, CONSTRAINT "UQ_fa2f51e414832a23041b63ea505" UNIQUE ("email"), CONSTRAINT "REL_25ba6f8aa1c21c6dc48aee8c45" UNIQUE ("address_id"), CONSTRAINT "PK_1a39dfb269e8ebbab178f9162ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "device_settings_connectlab" ("id" SERIAL NOT NULL, "is_on" boolean NOT NULL DEFAULT false, "room" character varying(15) NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_347d19630353ef1c2658dac4010" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_device_connectlab" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "device" jsonb NOT NULL, "userId" uuid, "settings_id" integer, "info_id" integer, CONSTRAINT "REL_42e791f8c48fd4469bcf80bca9" UNIQUE ("settings_id"), CONSTRAINT "REL_6652cdec5a9b2ac75fcfc2d196" UNIQUE ("info_id"), CONSTRAINT "PK_b22ef3bdbf54edbc938f8b82e8c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "device_info_connectlab" ("id" SERIAL NOT NULL, "mac_address" character varying DEFAULT 'XX:XX:XX:XX:XX:XX', "virtual_id" character varying NOT NULL DEFAULT 'abcd123', "ip_address" character varying NOT NULL DEFAULT '127.0.0.1', "signal" character varying, CONSTRAINT "PK_c703aed1dfde08de152e03def37" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_connectlab" ADD CONSTRAINT "FK_25ba6f8aa1c21c6dc48aee8c450" FOREIGN KEY ("address_id") REFERENCES "address_connectlab"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_device_connectlab" ADD CONSTRAINT "FK_919c27af012c414baa658ac7e4d" FOREIGN KEY ("userId") REFERENCES "user_connectlab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_device_connectlab" ADD CONSTRAINT "FK_42e791f8c48fd4469bcf80bca97" FOREIGN KEY ("settings_id") REFERENCES "device_settings_connectlab"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_device_connectlab" ADD CONSTRAINT "FK_6652cdec5a9b2ac75fcfc2d1960" FOREIGN KEY ("info_id") REFERENCES "device_info_connectlab"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_device_connectlab" DROP CONSTRAINT "FK_6652cdec5a9b2ac75fcfc2d1960"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_device_connectlab" DROP CONSTRAINT "FK_42e791f8c48fd4469bcf80bca97"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_device_connectlab" DROP CONSTRAINT "FK_919c27af012c414baa658ac7e4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_connectlab" DROP CONSTRAINT "FK_25ba6f8aa1c21c6dc48aee8c450"`,
    );
    await queryRunner.query(`DROP TABLE "device_info_connectlab"`);
    await queryRunner.query(`DROP TABLE "user_device_connectlab"`);
    await queryRunner.query(`DROP TABLE "device_settings_connectlab"`);
    await queryRunner.query(`DROP TABLE "user_connectlab"`);
    await queryRunner.query(`DROP TABLE "address_connectlab"`);
    await queryRunner.query(`DROP TABLE "device_connectlab"`);
  }
}
