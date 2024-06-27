import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepositoryReaderService } from '../../infraestructure-interfaces/respositories/user/user-repository-reader.interface';
import { IGetUserService } from './interfaces/get-user.interface';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';
import { UserParser } from 'src/security/domain/entities/dto-entities/user/parsers/user.dto.parser';
import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';

@Injectable()
export class GetUserService implements IGetUserService {
  constructor(
    private readonly userRepositoryReader: IUserRepositoryReaderService,
  ) {}
  async execute(id: string): Promise<UserEntity | null> {
    const entity: UserWithPwdEntity | null =
      await this.userRepositoryReader.find(id);
    if (!entity) {
      throw new NotFoundException();
    }
    return UserParser.FromUserWithPwdToUserEntity(entity);
  }
}
