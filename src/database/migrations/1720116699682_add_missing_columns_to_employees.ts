import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addMissingColumnsToEmployees1720116699682 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('employees', [
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                isNullable: false
            }),
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                isNullable: false,
                onUpdate: 'CURRENT_TIMESTAMP'
            }),
            new TableColumn({
                name: 'name',
                type: 'varchar',
                isNullable: false
            }),
            new TableColumn({
                name: 'role',
                type: 'varchar',
                isNullable: false
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('employees', 'role');
        await queryRunner.dropColumn('employees', 'name');
        await queryRunner.dropColumn('employees', 'updated_at');
        await queryRunner.dropColumn('employees', 'created_at');
    }

}