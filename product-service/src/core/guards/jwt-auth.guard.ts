import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('JWT token is missing');
    }

    return this.verifyToken(token, request);
  }

  private verifyToken(token: string, request: any): Observable<boolean> {
    return this.httpService
      .post(
        `${this.configService.get<string>(
          'AUTH_SERVICE_URL',
        )}auth/verify-token`,
        { token },
        {
          headers: {
            'x-api-key': this.configService.get<string>('SERVICE_SECRET_KEY'),
          },
        },
      )
      .pipe(
        map((response) => {
          if (response.status === 200) {
            request.user = {
              id: response.data.user_id,
              role: response.data.role,
            };
            return true;
          } else {
            throw new UnauthorizedException('Invalid token');
          }
        }),
        catchError((error) => {
          console.log(error);
          throw new UnauthorizedException('Token verification failed');
        }),
      );
  }
}
