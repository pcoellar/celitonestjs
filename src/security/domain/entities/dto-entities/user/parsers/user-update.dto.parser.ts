import { AuditableFieldsManager } from 'src/security/application/common-services/audit/utils';
import { UserWithPwdEntity } from '../../../data-entities/user-with-pwd.data.entity';
import { UserUpdateEntity } from '../user-update.dto.entity';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

export class UserUpdateParser {
  constructor(@Inject(REQUEST) private request) {}
  FromUserUpdateToUserWithPwd(
    userUpdate: UserUpdateEntity,
    entity: UserWithPwdEntity,
  ): UserWithPwdEntity {
    const auditableFieldsManager: AuditableFieldsManager =
      new AuditableFieldsManager(this.request);
    const auditFields = auditableFieldsManager.IncludeAuditableFieldsOnUpdate();
    const user: UserWithPwdEntity = {
      ...entity,
      ...userUpdate,
      ...auditFields,
    };
    return user;
  }
}
