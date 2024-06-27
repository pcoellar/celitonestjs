import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IActiveUserService } from 'src/security/application/usecases/user/interfaces/active-user.interface';
import { IAddUserService } from 'src/security/application/usecases/user/interfaces/add-user.interface';
import { IGetUserService } from 'src/security/application/usecases/user/interfaces/get-user.interface';
import { IGetUsersService } from 'src/security/application/usecases/user/interfaces/get-users.interface';
import { IInactiveUserService } from 'src/security/application/usecases/user/interfaces/inactive-user.interface';
import { IUpdateUserService } from 'src/security/application/usecases/user/interfaces/update-user.interface';
import { UserChangePwd } from 'src/security/domain/entities/dto-entities/user/user-change-pwd.dto.entity';
import { UserWithPwdEntity } from 'src/security/domain/entities/data-entities/user-with-pwd.data.entity';
import { IChangePwd } from 'src/security/application/usecases/user/interfaces/change-pwd.interface';
import { UserUpdateEntity } from 'src/security/domain/entities/dto-entities/user/user-update.dto.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { IChangeUserRoleService } from 'src/security/application/usecases/user/interfaces/change-user-role.interface';
import { UserChangeRoleEntity } from 'src/security/domain/entities/dto-entities/user/user-change-role.dto.entity';
import { UserCreateEntity } from 'src/security/domain/entities/dto-entities/user/user-create.dto.entity';

@ApiBearerAuth()
@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
export class UserController {
  constructor(
    private readonly activeUserUseCase: IActiveUserService,
    private readonly inactiveUserUseCase: IInactiveUserService,
    private readonly addUserUseCase: IAddUserService,
    private readonly updateUserUseCase: IUpdateUserService,
    private readonly getUserUseCase: IGetUserService,
    private readonly getUsersUseCase: IGetUsersService,
    private readonly changePwdUseCase: IChangePwd,
    private readonly changeUserRoleUseCase: IChangeUserRoleService,
  ) {}

  @Roles('admin', 'staff')
  @Get()
  async getUsers() {
    const users = await this.getUsersUseCase.execute();
    return users;
  }

  @Get(':id')
  async getUser(@Param('id') id?: string) {
    const users = await this.getUserUseCase.execute(id);
    return users;
  }

  @Put()
  async updateUser(@Body() userUpdateEntity: UserUpdateEntity) {
    const updatedUser = await this.updateUserUseCase.execute(userUpdateEntity);
    return updatedUser;
  }

  @Roles('admin', 'staff')
  @Post()
  async addUser(@Body() user: UserCreateEntity) {
    const userCreated = await this.addUserUseCase.execute(user);
    return userCreated;
  }

  @Roles('admin')
  @Post('changepwd')
  async changePassword(@Body() userPwdData: UserChangePwd) {
    const result = await this.changePwdUseCase.execute(userPwdData);
    return result;
  }

  @Roles('admin', 'staff')
  @Post(':id/activate')
  async activateUser(@Param('id') id?: string) {
    const users = await this.activeUserUseCase.execute(id);
    return users;
  }

  @Roles('admin', 'staff')
  @Post(':id/inactivate')
  async inactivateUser(@Param('id') id?: string) {
    const users = await this.inactiveUserUseCase.execute(id);
    return users;
  }

  @Roles('admin', 'staff')
  @Post('changerole')
  async changeRole(@Body() userChangeRoleData: UserChangeRoleEntity) {
    const user = await this.changeUserRoleUseCase.execute(userChangeRoleData);
    return user;
  }
}
