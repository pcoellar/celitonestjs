import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';
import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';
import { UserParser } from 'src/security/domain/entities/dto-entities/user/parsers/user.dto.parser';
import { IUserRepositoryReaderService } from 'src/security/application/infraestructure-interfaces/respositories/user/user-repository-reader.interface';
import { AccessToken } from 'src/security/domain/entities/service-entities/access-token.entity';
import { ICryptoService } from 'src/security/application/infraestructure-interfaces/common-services/crypto/crypto.interface';
import { IAuthService } from 'src/security/application/infraestructure-interfaces/auth/auth.interface';
import { UserStatus } from 'src/security/domain/enums/user-status.enum';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private usersRepositoryReaderService: IUserRepositoryReaderService,
    private cryptoApp: ICryptoService,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(email: string, password: string): Promise<UserEntity> {
    const user: UserWithPwdEntity =
      await this.usersRepositoryReaderService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const valid =
      this.cryptoApp.Decrypt(user.password) == password &&
      user.status == UserStatus.Active;
    if (!valid) {
      throw new BadRequestException(
        'Password does not match or user is inactive',
      );
    }
    return UserParser.FromUserWithPwdToUserEntity(user);
  }

  async Login(user: UserEntity): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
