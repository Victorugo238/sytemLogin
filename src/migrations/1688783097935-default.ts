import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688783097935 implements MigrationInterface {
    name = 'Default1688783097935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Formulario" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_378d55ddddc1da1f58f22b45317" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Formulario"`);
    }

}
