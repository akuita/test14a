import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class addMissingColumnsToAttendanceRecords1720116699682 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('attendance_records', [
            new TableColumn({
                name: 'check_in_time',
                type: 'timestamp',
                isNullable: true,
            }),
            new TableColumn({
                name: 'check_out_time',
                type: 'timestamp',
                isNullable: true,
            }),
            new TableColumn({
                name: 'status',
                type: 'varchar',
                length: '50',
            }),
            new TableColumn({
                name: 'employee_id',
                type: 'int',
            }),
        ]);

        await queryRunner.createForeignKey('attendance_records', new TableForeignKey({
            columnNames: ['employee_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employees',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('attendance_records', 'employee_id');
        await queryRunner.dropColumn('attendance_records', 'employee_id');
        await queryRunner.dropColumn('attendance_records', 'status');
        await queryRunner.dropColumn('attendance_records', 'check_out_time');
        await queryRunner.dropColumn('attendance_records', 'check_in_time');
    }
}