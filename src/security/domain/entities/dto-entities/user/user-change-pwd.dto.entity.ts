import { IsString } from "class-validator";

export class UserChangePwd {
  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsString()
  newPassword: string;

  @IsString()
  repeatPassword: string;
}
