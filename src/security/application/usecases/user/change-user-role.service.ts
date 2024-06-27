import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepositoryWriterService } from '../../infraestructure-interfaces/respositories/user/user-repository-writer.interface';
import { IUserRepositoryReaderService } from '../../infraestructure-interfaces/respositories/user/user-repository-reader.interface';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';
import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';
import { UserParser } from 'src/security/domain/entities/dto-entities/user/parsers/user.dto.parser';
import { IChangeUserRoleService } from './interfaces/change-user-role.interface';
import { UserChangeRoleEntity } from 'src/security/domain/entities/dto-entities/user/user-change-role.dto.entity';

@Injectable()
export class ChangeUserRoleService implements IChangeUserRoleService {
  constructor(
    private readonly userRepositoryWriter: IUserRepositoryWriterService,
    private readonly userRepositoryReader: IUserRepositoryReaderService,
  ) {}
  async execute(userChangeRoleData: UserChangeRoleEntity): Promise<UserEntity> {
    let entity: UserWithPwdEntity | null = null;
    try {
      entity = await this.userRepositoryReader.find(userChangeRoleData.id);
    } catch (error) {
      throw new NotFoundException();
    }
    entity.role = userChangeRoleData.role;
    return UserParser.FromUserWithPwdToUserEntity(
      await this.userRepositoryWriter.update(entity),
    );
  }
}
