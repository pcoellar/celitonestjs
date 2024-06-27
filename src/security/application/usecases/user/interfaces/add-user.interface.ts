import { UserCreateEntity } from 'src/security/domain/entities/dto-entities/user/user-create.dto.entity';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';

export abstract class IAddUserService {
  abstract execute(user: UserCreateEntity): Promise<UserEntity>;
}
