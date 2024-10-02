import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Subscription } from '@modules/common/infra/typeorm/entities/subscription'

@Entity('photographers')
class Photographer {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'name', nullable: true })
  name?: string

  @Column({ name: 'cpf', nullable: true })
  cpf?: string

  @Column({ name: 'email', nullable: true })
  email?: string

  @Column({ name: 'telephone', nullable: true })
  telephone?: string

  @Column({ name: 'photos', nullable: true })
  photos?: string

  @Column({ name: 'subscription_id', nullable: true })
  subscriptionId?: string

  @Column({ name: 'year', nullable: true, type: 'timestamptz' })
  year?: Date

  @Column({ name: 'status', nullable: true, default: false })
  status?: boolean

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

export { Photographer }
