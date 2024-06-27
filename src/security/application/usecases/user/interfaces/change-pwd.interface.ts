import { UserChangePwd } from 'src/security/domain/entities/dto-entities/user/user-change-pwd.dto.entity';

export abstract class IChangePwd {
  abstract execute(userChangePwdData: UserChangePwd): Promise<string>;
}
