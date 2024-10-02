import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePhotographer1724969211005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'photographers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'telephone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'photos',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'subscription_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'year',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKSubscriptionPhotographerSubscriptionId',
            referencedTableName: 'subscriptions',
            referencedColumnNames: ['id'],
            columnNames: ['subscription_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('photographers')
  }
}
