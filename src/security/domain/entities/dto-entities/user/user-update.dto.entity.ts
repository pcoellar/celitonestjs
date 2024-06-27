import { IsEnum, IsString, MinLength } from 'class-validator';
import { UserStatus } from '../../../enums/user-status.enum';

export class UserUpdateEntity {
  @IsString()
  id: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsEnum(UserStatus)
  status: UserStatus;
}
