import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import type { IUser } from '../../shared/interfaces';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user: IUser = await this.fetchUserByUsername(username);

    console.log({ user });

    console.log({ password });
    const hashedPassword: string = crypto
      .pbkdf2Sync(password, user.passwordSalt, 1000, 64, `sha512`)
      .toString(`hex`);

    if (hashedPassword !== user.password) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }

  async fetchUserByUsername(username: string) {
    const userServiceURL: string =
      this.configService.get<string>('USER_SERVICE_URL');
    const response = await firstValueFrom(
      this.httpService.get(`${userServiceURL}users/username/${username}`, {
        headers: {
          'x-api-key': this.configService.get<string>('SERVICE_SECRET_KEY'),
        },
      }),
    );

    return response.data;
  }

  verifyToken(token: string): object {
    return this.jwtService.verify(token);
  }

  login(user: IUser): object {
    const token: string = this.jwtService.sign({
      user_id: user._id,
      role: user.role,
    });

    return {
      access_token: token,
    };
  }
}
