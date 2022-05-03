import {MigrationInterface, QueryRunner} from "typeorm";

export class databaseMigrations1651441170300 implements MigrationInterface {
    name = 'databaseMigrations1651441170300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("sid" character varying NOT NULL, "sess" json NOT NULL, "expire" TIMESTAMP NOT NULL, CONSTRAINT "PK_7575923e18b495ed2307ae629ae" PRIMARY KEY ("sid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_72ee4135086941ddca6a9b4b20" ON "session" ("expire") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "characterId" integer NOT NULL, "userId" uuid, CONSTRAINT "UQ_050906f913e075a859a7a8369f0" UNIQUE ("userId", "characterId"), CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72ee4135086941ddca6a9b4b20"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
