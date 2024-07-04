import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAttendanceRecordsTable1720119935990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendance_records',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'check_in_time',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'check_out_time',
            type: 'time',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'employee_id',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'attendance_records',
      new TableForeignKey({
        columnNames: ['employee_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employees',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('attendance_records');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('employee_id') !== -1);
    await queryRunner.dropForeignKey('attendance_records', foreignKey);
    await queryRunner.dropTable('attendance_records');
  }
}