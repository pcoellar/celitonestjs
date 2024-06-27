import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepositoryWriterService } from '../../infraestructure-interfaces/respositories/user/user-repository-writer.interface';
import { IUpdateUserService } from './interfaces/update-user.interface';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';
import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';
import { IUserRepositoryReaderService } from '../../infraestructure-interfaces/respositories/user/user-repository-reader.interface';
import { UserParser } from 'src/security/domain/entities/dto-entities/user/parsers/user.dto.parser';
import { UserUpdateEntity } from 'src/security/domain/entities/dto-entities/user/user-update.dto.entity';
import { UserUpdateParser } from '../../../domain/entities/dto-entities/user/parsers/user-update.dto.parser';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class UpdateUserService implements IUpdateUserService {
  constructor(
    private readonly userRepositoryWriter: IUserRepositoryWriterService,
    private readonly userRepositoryReader: IUserRepositoryReaderService,
    @Inject(REQUEST) private request,
  ) {}
  private checkValidationRules(user: UserUpdateEntity): string {
    if (!user.name) {
      return 'Name field is required';
    }
    if (!user.status) {
      return 'Status field is required';
    }
    return '';
  }
  async execute(user: UserUpdateEntity): Promise<UserEntity> {
    let entity: UserWithPwdEntity | null = await this.userRepositoryReader.find(
      user.id,
    );
    if (!entity) {
      throw new NotFoundException();
    }
    const errorRules: string = this.checkValidationRules(user);
    if (errorRules) {
      throw new BadRequestException(errorRules);
    }
    const userUpdateParser: UserUpdateParser = new UserUpdateParser(
      this.request,
    );
    entity = userUpdateParser.FromUserUpdateToUserWithPwd(user, entity);
    return UserParser.FromUserWithPwdToUserEntity(
      await this.userRepositoryWriter.update(entity),
    );
  }
}
