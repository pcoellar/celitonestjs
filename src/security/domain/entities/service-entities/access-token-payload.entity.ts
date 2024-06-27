import { Roles } from '../../enums/roles.enum';

export class AccessTokenPayload {
  id: string;
  email: string;
  role: Roles;
}
