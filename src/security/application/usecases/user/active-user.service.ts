import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepositoryWriterService } from '../../infraestructure-interfaces/respositories/user/user-repository-writer.interface';
import { IActiveUserService } from './interfaces/active-user.interface';
import { IUserRepositoryReaderService } from '../../infraestructure-interfaces/respositories/user/user-repository-reader.interface';
import { UserStatus } from 'src/security/domain/enums/user-status.enum';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';
import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';
import { UserParser } from 'src/security/domain/entities/dto-entities/user/parsers/user.dto.parser';

@Injectable()
export class ActiveUserService implements IActiveUserService {
  constructor(
    private readonly userRepositoryWriter: IUserRepositoryWriterService,
    private readonly userRepositoryReader: IUserRepositoryReaderService,
  ) {}
  async execute(id: string): Promise<UserEntity> {
    let entity: UserWithPwdEntity | null = null;
    try {
      entity = await this.userRepositoryReader.find(id);
    } catch (error) {
      throw new NotFoundException();
    }
    entity.status = UserStatus.Active;
    return UserParser.FromUserWithPwdToUserEntity(
      await this.userRepositoryWriter.update(entity),
    );
  }
}
