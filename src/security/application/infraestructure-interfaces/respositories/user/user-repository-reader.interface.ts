import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';

export abstract class IUserRepositoryReaderService {
  abstract find(id: string): Promise<UserWithPwdEntity | null>;
  abstract findByEmail(email: string): Promise<UserWithPwdEntity | null>;
  abstract findAll(): Promise<UserWithPwdEntity[]>;
}
