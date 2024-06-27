import { UserStatus } from '../../enums/user-status.enum';
import { Column, Entity } from 'typeorm';
import { AuditableDataEntity } from './base/auditable-data-entity';
import { Roles } from '../../enums/roles.enum';

@Entity('users')
export class UserWithPwdEntity extends AuditableDataEntity {
  @Column('varchar', { length: 100, nullable: false })
  name: string;
  @Column('varchar', { length: 60, nullable: false })
  email: string;
  @Column('varchar', { length: 60, nullable: false })
  password: string;
  @Column('varchar', { length: 20, nullable: false })
  status: UserStatus;
  @Column('varchar', { length: 20, nullable: false })
  role: Roles;
}
