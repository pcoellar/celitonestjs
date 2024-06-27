import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

export class AuditableFieldsManager {
  constructor(@Inject(REQUEST) private request) {}

  private GetUserId(): string {
    let userId = '';
    if (this.request.user) {
      userId = this.request.user.id;
    }
    return userId;
  }

  IncludeAuditableFieldsOnCreate() {
    return { createdDate: new Date(), createdBy: this.GetUserId() };
  }

  IncludeAuditableFieldsOnUpdate() {
    return { lastModified: new Date(), modifiedBy: this.GetUserId() };
  }
}
