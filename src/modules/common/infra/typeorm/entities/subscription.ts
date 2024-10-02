import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('subscriptions')
class Subscription {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'name', nullable: true })
  name?: string

  @Column({ name: 'price', nullable: true })
  price?: Number

  @Column({ name: 'descriptionc', nullable: true })
  descriptionc?: string

  @Column({ name: 'duration', nullable: true })
  duration?: Number

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

export { Subscription }
