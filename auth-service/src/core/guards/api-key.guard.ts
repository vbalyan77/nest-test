import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    const SERVICE_SECRET_KEY =
      this.configService.get<string>('SERVICE_SECRET_KEY');

    if (apiKey !== SERVICE_SECRET_KEY) {
      throw new ForbiddenException('Invalid API Key');
    }

    return true;
  }
}
