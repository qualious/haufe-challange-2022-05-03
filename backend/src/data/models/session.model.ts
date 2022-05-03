/* eslint import/no-cycle: "off" */
import { Session as SessionObject } from 'data/types/server.type';
import { Entity, BaseEntity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity()
export default class Session extends BaseEntity {
  @PrimaryColumn('varchar')
  sid: string;

  @Column({ type: 'json' })
  sess: SessionObject;

  @Index()
  @Column({ type: 'timestamp' })
  expire: Date;
}
