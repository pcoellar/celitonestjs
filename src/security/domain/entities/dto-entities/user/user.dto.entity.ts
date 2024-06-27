import { Roles } from 'src/security/domain/enums/roles.enum';
import { UserStatus } from '../../../enums/user-status.enum';

export class UserEntity {
  id: string;
  name?: string;
  email?: string;
  status?: UserStatus;
  createdDate?: Date;
  createdBy?: string;
  lastModified?: Date;
  modifiedBy?: string;
  role?: Roles;
}
