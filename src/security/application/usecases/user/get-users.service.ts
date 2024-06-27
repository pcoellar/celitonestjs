import { Injectable } from '@nestjs/common';
import { IUserRepositoryReaderService } from '../../infraestructure-interfaces/respositories/user/user-repository-reader.interface';
import { IGetUsersService } from './interfaces/get-users.interface';
import { UserEntity } from 'src/security/domain/entities/dto-entities/user/user.dto.entity';
import { UserParser } from 'src/security/domain/entities/dto-entities/user/parsers/user.dto.parser';

@Injectable()
export class GetUsersService implements IGetUsersService {
  constructor(private readonly userRepository: IUserRepositoryReaderService) {}
  async execute(): Promise<UserEntity[]> {
    return UserParser.FromUsersWithPwdToUsersEntity(
      await this.userRepository.findAll(),
    );
  }
}
