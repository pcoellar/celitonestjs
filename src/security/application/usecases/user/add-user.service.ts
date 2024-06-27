import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepositoryWriterService } from '../../infraestructure-interfaces/respositories/user/user-repository-writer.interface';
import { IAddUserService } from './interfaces/add-user.interface';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';
import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';
import { UserParser } from 'src/security/domain/entities/dto-entities/user/parsers/user.dto.parser';
import { IPasswordRulesChecker } from '../../infraestructure-interfaces/validators/password-rules-checker.interface';
import { UserCreateEntity } from 'src/security/domain/entities/dto-entities/user/user-create.dto.entity';
import { UserCreateParser } from '../../../domain/entities/dto-entities/user/parsers/user-create.dto.parser';
import { IUserRepositoryReaderService } from '../../infraestructure-interfaces/respositories/user/user-repository-reader.interface';
import { ICryptoService } from '../../infraestructure-interfaces/common-services/crypto/crypto.interface';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AddUserService implements IAddUserService {
  constructor(
    private readonly userRepositoryReader: IUserRepositoryReaderService,
    private readonly userRepositoryWriter: IUserRepositoryWriterService,
    private readonly pwdRulesChecker: IPasswordRulesChecker,
    private readonly cryptoApp: ICryptoService,
    @Inject(REQUEST) private request,
  ) {}
  private async checkValidationRules(user: UserCreateEntity): Promise<string> {
    const userFound = await this.userRepositoryReader.findByEmail(user.email);
    if (userFound) {
      return 'A user with the same email already exists';
    }
    return '';
  }
  async execute(user: UserCreateEntity): Promise<UserEntity> {
    const pwdError: string = this.pwdRulesChecker.checkPwdRules(user.password);
    if (pwdError) {
      throw new BadRequestException(pwdError);
    }
    const errorRules: string = await this.checkValidationRules(user);
    if (errorRules) {
      throw new BadRequestException(errorRules);
    }
    let entity: UserWithPwdEntity | null = null;
    user.password = this.cryptoApp.Encrypt(user.password);
    try {
      const userCreateParser: UserCreateParser = new UserCreateParser(
        this.request,
      );
      entity = await this.userRepositoryWriter.insert(
        userCreateParser.FromUserCreateToUserWithPwd(user),
      );
    } catch (error) {
      throw new BadRequestException();
    }
    return UserParser.FromUserWithPwdToUserEntity(entity);
  }
}
