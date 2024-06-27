import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';

export abstract class IUserRepositoryWriterService {
  abstract insert(entity: UserWithPwdEntity): Promise<UserWithPwdEntity>;
  abstract update(entity: UserWithPwdEntity): Promise<UserWithPwdEntity>;
  abstract deleteById(id: string): Promise<void>;
}
