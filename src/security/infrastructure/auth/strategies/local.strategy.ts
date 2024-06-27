import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAuthService } from 'src/security/application/infraestructure-interfaces/auth/auth.interface';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: IAuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.authService.ValidateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
