export abstract class IPasswordRulesChecker {
  abstract checkPwdRules(password: string): string;
}
