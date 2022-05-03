/* eslint import/no-cycle: "off" */
import { Length } from 'class-validator';
import { Entity, BaseEntity, Column, Unique, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Favorite from './favorite.model';

@Entity()
@Unique(['email'])
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Length(0, 255)
  @Column()
  email: string;

  @Length(0, 255)
  @Column({ select: false })
  password: string;

  @Length(0, 255)
  @Column({ select: false })
  salt: string;

  @OneToMany(() => Favorite, (favorite: Favorite) => favorite.user)
  favorites: Favorite[];
}
