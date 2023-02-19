import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePostTable1676839728292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistIdId" uuid, "favoriteId" uuid, CONSTRAINT "REL_f74d24b7a35551b0c9cc650be1" UNIQUE ("artistIdId"), CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistIdId" uuid, "albumIdId" uuid, "favoriteId" uuid, CONSTRAINT "REL_9b1a336159819e6518395fa0a1" UNIQUE ("artistIdId"), CONSTRAINT "REL_22860a4820e8a80b73be4dc15b" UNIQUE ("albumIdId"), CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, "favoriteId" uuid, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_f74d24b7a35551b0c9cc650be11" FOREIGN KEY ("artistIdId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_8bb45f5c99469634559742c4e39" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_9b1a336159819e6518395fa0a18" FOREIGN KEY ("artistIdId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_22860a4820e8a80b73be4dc15bb" FOREIGN KEY ("albumIdId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_615a4884588a44718243e290740" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "artists" ADD CONSTRAINT "FK_6a5822b115020da7ab3609f369c" FOREIGN KEY ("favoriteId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "artists" DROP CONSTRAINT "FK_6a5822b115020da7ab3609f369c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_615a4884588a44718243e290740"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_22860a4820e8a80b73be4dc15bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_9b1a336159819e6518395fa0a18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_8bb45f5c99469634559742c4e39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_f74d24b7a35551b0c9cc650be11"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "artists"`);
    await queryRunner.query(`DROP TABLE "favorites"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
    await queryRunner.query(`DROP TABLE "albums"`);
  }
}
