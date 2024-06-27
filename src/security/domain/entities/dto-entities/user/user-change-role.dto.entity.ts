import { IsEnum, IsString } from 'class-validator';
import { Roles } from 'src/security/domain/enums/roles.enum';

export class UserChangeRoleEntity {
  @IsString()
  id: string;

  @IsString()
  @IsEnum(Roles)
  role: Roles;
}
