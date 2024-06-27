import { UserWithPwdEntity } from '../../../data-entities/user-with-pwd.data.entity';
import { UserEntity } from '../user.dto.entity';

export class UserParser {
  static FromUserWithPwdToUserEntity(
    userWithPwd: UserWithPwdEntity,
  ): UserEntity {
    const userEntity = { ...userWithPwd };
    delete userEntity.password;
    return userEntity;
  }
  static FromUsersWithPwdToUsersEntity(
    usersWithPwd: UserWithPwdEntity[],
  ): UserEntity[] {
    const users: UserEntity[] = [];
    for (let i = 0; i < usersWithPwd.length; i++) {
      const user = this.FromUserWithPwdToUserEntity(usersWithPwd[i]);
      users.push(user);
    }
    return users;
  }
}
