import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { IUser } from 'src/shared/interfaces';
import { ApiKeyGuard } from 'src/core/guards';
import { ApiExcludeEndpoint, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Successfully logged in.',
    type: LoginResponse,
  })
  async login(@Body() loginDto: LoginDto) {
    const user: IUser = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }

  @Post('verify-token')
  @HttpCode(200)
  @UseGuards(ApiKeyGuard)
  @ApiExcludeEndpoint()
  verifyToken(@Body('token') token: string): object {
    return this.authService.verifyToken(token);
  }
}
