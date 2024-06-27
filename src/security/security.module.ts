import { Module } from '@nestjs/common';
import { IActiveUserService } from './application/usecases/user/interfaces/active-user.interface';
import { ActiveUserService } from './application/usecases/user/active-user.service';
import { IInactiveUserService } from './application/usecases/user/interfaces/inactive-user.interface';
import { InactiveUserService } from './application/usecases/user/inactive-user.service';
import { IAddUserService } from './application/usecases/user/interfaces/add-user.interface';
import { AddUserService } from './application/usecases/user/add-user.service';
import { IUpdateUserService } from './application/usecases/user/interfaces/update-user.interface';
import { UpdateUserService } from './application/usecases/user/update-user.service';
import { IGetUsersService } from './application/usecases/user/interfaces/get-users.interface';
import { GetUsersService } from './application/usecases/user/get-users.service';
import { IUserRepositoryReaderService } from './application/infraestructure-interfaces/respositories/user/user-repository-reader.interface';
import { UserRepositoryReaderService } from './infrastructure/repositories/user/user-repository-reader.service';
import { IUserRepositoryWriterService } from './application/infraestructure-interfaces/respositories/user/user-repository-writer.interface';
import { UserRepositoryWriterService } from './infrastructure/repositories/user/user-repository-writer.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserWithPwdEntity } from './domain/entities/data-entities/user-with-pwd.data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IGetUserService } from './application/usecases/user/interfaces/get-user.interface';
import { GetUserService } from './application/usecases/user/get-user.service';
import { IChangePwd } from './application/usecases/user/interfaces/change-pwd.interface';
import { ChangePwd } from './application/usecases/user/change-pwd.service';
import { IPasswordRulesChecker } from './application/infraestructure-interfaces/validators/password-rules-checker.interface';
import { PasswordRulesChecker } from './infrastructure/validators/password-rules-checker.validator';
import { ICryptoService } from './application/infraestructure-interfaces/common-services/crypto/crypto.interface';
import { CryptoService } from './infrastructure/common-services/crypto/crypto.service';
import { IAuthService } from './application/infraestructure-interfaces/auth/auth.interface';
import { AuthService } from './infrastructure/auth/auth.service';
import { LocalStrategy } from './infrastructure/auth/strategies/local.strategy';
import { JwtStrategy } from './infrastructure/auth/strategies/jwt.strategy';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { IChangeUserRoleService } from './application/usecases/user/interfaces/change-user-role.interface';
import { ChangeUserRoleService } from './application/usecases/user/change-user-role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserWithPwdEntity]),
    PassportModule.register({}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow('ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC'),
          ),
        },
      }),
    }),
  ],
  providers: [
    {
      provide: IUserRepositoryReaderService,
      useClass: UserRepositoryReaderService,
    },
    {
      provide: IUserRepositoryWriterService,
      useClass: UserRepositoryWriterService,
    },
    {
      provide: IActiveUserService,
      useClass: ActiveUserService,
    },
    {
      provide: IInactiveUserService,
      useClass: InactiveUserService,
    },
    {
      provide: IAddUserService,
      useClass: AddUserService,
    },
    {
      provide: IUpdateUserService,
      useClass: UpdateUserService,
    },
    {
      provide: IGetUserService,
      useClass: GetUserService,
    },
    {
      provide: IGetUsersService,
      useClass: GetUsersService,
    },
    {
      provide: IChangePwd,
      useClass: ChangePwd,
    },
    {
      provide: IChangeUserRoleService,
      useClass: ChangeUserRoleService,
    },
    {
      provide: IPasswordRulesChecker,
      useClass: PasswordRulesChecker,
    },
    {
      provide: ICryptoService,
      useClass: CryptoService,
    },
    {
      provide: IAuthService,
      useClass: AuthService,
    },
    LocalStrategy,
    JwtStrategy,
    ConfigService,
  ],
  controllers: [AuthController, UserController],
  exports: [LocalStrategy, JwtStrategy, PassportModule],
})
export class SecurityModule {}
