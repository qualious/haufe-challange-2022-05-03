/* eslint import/no-cycle: "off" */
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  Unique,
} from 'typeorm';
import User from './user.model';

@Entity()
@Unique(['user', 'characterId'])
export default class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  characterId: number;

  @ManyToOne(() => User, (user: User) => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  @RelationId((favorite: Favorite) => favorite.user)
  userId: string;
}
