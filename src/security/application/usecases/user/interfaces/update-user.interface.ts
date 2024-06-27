import { UserUpdateEntity } from 'src/security/domain/entities/dto-entities/user/user-update.dto.entity';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';

export abstract class IUpdateUserService {
  abstract execute(user: UserUpdateEntity): Promise<UserEntity>;
}
