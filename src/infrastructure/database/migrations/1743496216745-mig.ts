import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1743496216745 implements MigrationInterface {
    name = 'Mig1743496216745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`privilege\` (\`privilegeId\` int NOT NULL AUTO_INCREMENT, \`privilegeName\` varchar(255) NOT NULL, \`privilegeSubName\` varchar(255) NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0), \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0), UNIQUE INDEX \`IDX_a0af5260f3f06a8c1a4a9032a1\` (\`privilegeName\`, \`privilegeSubName\`), PRIMARY KEY (\`privilegeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`roleId\` int NOT NULL AUTO_INCREMENT, \`roleName\` varchar(255) NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0), \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0), UNIQUE INDEX \`IDX_a6142dcc61f5f3fb2d6899fa26\` (\`roleName\`), PRIMARY KEY (\`roleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`userId\` varchar(36) NOT NULL, \`userName\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`userStatus\` varchar(255) NOT NULL DEFAULT 'NOT_VERIFIED', \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0), \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0), \`roleRoleId\` int NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_privileges_privilege\` (\`roleRoleId\` int NOT NULL, \`privilegePrivilegeId\` int NOT NULL, INDEX \`IDX_1be5467ea8802e64cd0f1fdd2c\` (\`roleRoleId\`), INDEX \`IDX_b97f2feffc2ddab30c05a4f4ca\` (\`privilegePrivilegeId\`), PRIMARY KEY (\`roleRoleId\`, \`privilegePrivilegeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_ffe3092db843bd8f90fcfe97da7\` FOREIGN KEY (\`roleRoleId\`) REFERENCES \`role\`(\`roleId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_privileges_privilege\` ADD CONSTRAINT \`FK_1be5467ea8802e64cd0f1fdd2c3\` FOREIGN KEY (\`roleRoleId\`) REFERENCES \`role\`(\`roleId\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_privileges_privilege\` ADD CONSTRAINT \`FK_b97f2feffc2ddab30c05a4f4ca2\` FOREIGN KEY (\`privilegePrivilegeId\`) REFERENCES \`privilege\`(\`privilegeId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`role_privileges_privilege\` DROP FOREIGN KEY \`FK_b97f2feffc2ddab30c05a4f4ca2\``);
        await queryRunner.query(`ALTER TABLE \`role_privileges_privilege\` DROP FOREIGN KEY \`FK_1be5467ea8802e64cd0f1fdd2c3\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_ffe3092db843bd8f90fcfe97da7\``);
        await queryRunner.query(`DROP INDEX \`IDX_b97f2feffc2ddab30c05a4f4ca\` ON \`role_privileges_privilege\``);
        await queryRunner.query(`DROP INDEX \`IDX_1be5467ea8802e64cd0f1fdd2c\` ON \`role_privileges_privilege\``);
        await queryRunner.query(`DROP TABLE \`role_privileges_privilege\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_a6142dcc61f5f3fb2d6899fa26\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0af5260f3f06a8c1a4a9032a1\` ON \`privilege\``);
        await queryRunner.query(`DROP TABLE \`privilege\``);
    }

}
