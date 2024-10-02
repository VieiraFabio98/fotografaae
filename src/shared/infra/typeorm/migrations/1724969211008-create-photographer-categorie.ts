import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePhotographerCategorie1724969211008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'photographer_categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'photographer_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'categorie_id',
            type: 'uuid',
            isNullable: false,
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
            name: 'FKPhotographerPhotographerCategoriePhotographerId',
            referencedTableName: 'photographers',
            referencedColumnNames: ['id'],
            columnNames: ['photographer_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCategoriePhotographerCategorieCategorieId',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['categorie_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('photographer_categories')
  }
}
