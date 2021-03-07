import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { Server, User } from '@/entity'

@Entity()
export class UserBanGlobal {
  @ManyToOne({ entity: () => User, primary: true })
  user: User;

  [PrimaryKeyType]: string

  @Property()
  createdAt: Date = new Date()

  @ManyToOne({ entity: () => User })
  bannedBy: User

  @Property({ nullable: true })
  reason?: string
}
