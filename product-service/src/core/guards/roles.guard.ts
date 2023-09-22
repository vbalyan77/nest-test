import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      handler,
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userRole = request.user?.role;

    if (!requiredRoles.includes(userRole)) throw new ForbiddenException();
    return true;
  }
}
