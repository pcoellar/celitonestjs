import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';
import { AccessToken } from 'src/security/domain/entities/service-entities/access-token.entity';

export abstract class IAuthService {
  abstract ValidateUser(email: string, password: string): Promise<UserEntity>;
  abstract Login(user: UserEntity): Promise<AccessToken>;
}
