import { Injectable } from '@nestjs/common';
import { IPasswordRulesChecker } from '../../application/infraestructure-interfaces/validators/password-rules-checker.interface';

@Injectable()
export class PasswordRulesChecker extends IPasswordRulesChecker {
  checkPwdRules(password: string) {
    if (!password) {
      return 'Empty password';
    }
    if (password.length < 6) {
      return 'New password length must be at least 6 characters';
    }
    return '';
  }
}
