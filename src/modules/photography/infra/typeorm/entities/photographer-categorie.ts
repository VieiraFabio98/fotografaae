import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Photographer } from '@modules/photography/infra/typeorm/entities/photographer'
import { Categorie } from '@modules/photography/infra/typeorm/entities/categorie'

@Entity('photographer_categories')
class PhotographerCategorie {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'photographer_id', nullable: true })
  photographerId?: string

  @Column({ name: 'categorie_id', nullable: true })
  categorieId?: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { PhotographerCategorie }
