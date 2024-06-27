import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';
import { IUserRepositoryReaderService } from 'src/security/application/infraestructure-interfaces/respositories/user/user-repository-reader.interface';

@Injectable()
export class UserRepositoryReaderService
  implements IUserRepositoryReaderService
{
  constructor(
    @InjectRepository(UserWithPwdEntity)
    private readonly entityRepository: Repository<UserWithPwdEntity>,
  ) {}

  async find(id: string): Promise<UserWithPwdEntity> {
    try {
      return await this.entityRepository.findOne({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }

  async findByEmail(email: string): Promise<UserWithPwdEntity | null> {
    if (!email) {
      return null;
    }
    return await this.entityRepository.findOneBy({ email });
  }

  async findAll(): Promise<UserWithPwdEntity[]> {
    const entities: UserWithPwdEntity[] = await this.entityRepository.find();
    return entities;
  }
}
