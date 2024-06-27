import {
  BadRequestException,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessToken } from 'src/security/domain/entities/service-entities/access-token.entity';
import { IAuthService } from 'src/security/application/infraestructure-interfaces/auth/auth.interface';
import { Public } from '../auth/decorators/public.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserLoginEntity } from 'src/security/domain/entities/dto-entities/user/user-login.dto.entity copy';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: IAuthService) {}
  @ApiBody({ type: UserLoginEntity })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<AccessToken | BadRequestException> {
    return this.authService.Login(req.user);
  }
}
