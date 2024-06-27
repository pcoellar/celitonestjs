import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';

export abstract class IActiveUserService {
  abstract execute(id: string): Promise<UserEntity>;
}
