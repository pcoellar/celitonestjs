import { AuditableFieldsManager } from 'src/security/application/common-services/audit/utils';
import { UserWithPwdEntity } from '../../../data-entities/user-with-pwd.data.entity';
import { UserCreateEntity } from '../user-create.dto.entity';
import { v4 as uuidv4 } from 'uuid';
import { REQUEST } from '@nestjs/core';
import { Inject } from '@nestjs/common';

export class UserCreateParser {
  constructor(@Inject(REQUEST) private request) {}
  FromUserCreateToUserWithPwd(userCreate: UserCreateEntity): UserWithPwdEntity {
    const auditableFieldsManager: AuditableFieldsManager =
      new AuditableFieldsManager(this.request);
    const auditFields = auditableFieldsManager.IncludeAuditableFieldsOnCreate();
    const user: UserWithPwdEntity = {
      ...userCreate,
      ...auditFields,
      id: uuidv4(),
    };
    return user;
  }
}
