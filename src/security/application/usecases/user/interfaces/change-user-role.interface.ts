import { UserChangeRoleEntity } from 'src/security/domain/entities/dto-entities/user/user-change-role.dto.entity';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';

export abstract class IChangeUserRoleService {
  abstract execute(
    userChangeRoleData: UserChangeRoleEntity,
  ): Promise<UserEntity>;
}
