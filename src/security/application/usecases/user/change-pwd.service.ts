import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepositoryWriterService } from '../../infraestructure-interfaces/respositories/user/user-repository-writer.interface';
import { IChangePwd } from './interfaces/change-pwd.interface';
import { UserChangePwd } from 'src/security/domain/entities/dto-entities/user/user-change-pwd.dto.entity';
import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';
import { IUserRepositoryReaderService } from '../../infraestructure-interfaces/respositories/user/user-repository-reader.interface';
import { IPasswordRulesChecker } from '../../infraestructure-interfaces/validators/password-rules-checker.interface';
import { ICryptoService } from '../../infraestructure-interfaces/common-services/crypto/crypto.interface';

@Injectable()
export class ChangePwd implements IChangePwd {
  constructor(
    private readonly userRepositoryWriter: IUserRepositoryWriterService,
    private readonly userRepositoryReader: IUserRepositoryReaderService,
    private readonly pwdRulesChecker: IPasswordRulesChecker,
    private readonly cryptoApp: ICryptoService,
  ) {}

  private async checkValidationRules(
    changePwdData: UserChangePwd,
    entity: UserWithPwdEntity,
  ) {
    if (changePwdData.password != entity.password) {
      return 'Old password does not match';
    }
    if (changePwdData.newPassword != changePwdData.repeatPassword) {
      return 'Repeat password is not the same as new password';
    }
    if (entity.password == changePwdData.newPassword) {
      return 'New password can not be the same as old password';
    }
    const errorPwd: string = this.pwdRulesChecker.checkPwdRules(
      changePwdData.newPassword,
    );
    return errorPwd;
  }

  async execute(changePwdData: UserChangePwd): Promise<string> {
    if (!changePwdData.id) {
      throw new BadRequestException('Missing id field');
    }
    const entity: UserWithPwdEntity | null =
      await this.userRepositoryReader.find(changePwdData.id);
    if (!entity) {
      throw new NotFoundException();
    }
    entity.password = this.cryptoApp.Decrypt(entity.password);
    const rulesError: string = await this.checkValidationRules(
      changePwdData,
      entity,
    );
    if (rulesError) {
      throw new BadRequestException(rulesError);
    }
    entity.password = this.cryptoApp.Encrypt(changePwdData.newPassword);
    this.userRepositoryWriter.update(entity);
    return 'OK';
  }
}
