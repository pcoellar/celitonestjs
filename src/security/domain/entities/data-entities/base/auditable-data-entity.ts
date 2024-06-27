import { Column } from 'typeorm';
import { DataEntity } from './data-entity.data';

export abstract class AuditableDataEntity extends DataEntity {
  @Column('timestamp', { nullable: true })
  createdDate?: Date;
  @Column('varchar', { length: 60, nullable: true })
  createdBy?: string;
  @Column('timestamp', { nullable: true })
  lastModified?: Date;
  @Column('varchar', { length: 60, nullable: true })
  modifiedBy?: string;
}
