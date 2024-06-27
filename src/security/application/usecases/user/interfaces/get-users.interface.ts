import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';

export abstract class IGetUsersService {
  abstract execute(): Promise<UserEntity[]>;
}
