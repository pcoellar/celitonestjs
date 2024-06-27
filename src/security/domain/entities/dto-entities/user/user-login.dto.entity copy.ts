import { ApiProperty } from '@nestjs/swagger';

export class UserLoginEntity {
  @ApiProperty({ type: 'string' })
  email: string;
  @ApiProperty({ type: 'string' })
  password: string;
}
