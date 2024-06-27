import { Roles } from 'src/security/domain/enums/roles.enum';
import { UserStatus } from '../../../enums/user-status.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UserCreateEntity {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Roles)
  role: Roles;
}
