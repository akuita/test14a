import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEmployeesTable1720119960556 implements MigrationInterface {
    name = 'UpdateEmployeesTable1720119960556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Since we are not directly updating the 'employees' table, we leave this empty
        // The relationship is established via the entity model
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Since we are not directly updating the 'employees' table, we leave this empty
        // The relationship is established via the entity model
    }
}