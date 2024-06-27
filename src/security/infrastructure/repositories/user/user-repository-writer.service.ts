import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';
import { IUserRepositoryWriterService } from 'src/security/application/infraestructure-interfaces/respositories/user/user-repository-writer.interface';

@Injectable()
export class UserRepositoryWriterService
  implements IUserRepositoryWriterService
{
  constructor(
    @InjectRepository(UserWithPwdEntity)
    private readonly entityRepository: Repository<UserWithPwdEntity>,
  ) {}

  async insert(entity: UserWithPwdEntity): Promise<UserWithPwdEntity> {
    const data = await this.entityRepository.create(entity);
    const result = await this.entityRepository.save(data);
    return result;
  }

  async update(entity: UserWithPwdEntity): Promise<UserWithPwdEntity> {
    const id = entity.id;
    try {
      await this.entityRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
    await this.entityRepository.save(entity);
    return entity;
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.entityRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
    await this.entityRepository.delete(id);
  }
}
