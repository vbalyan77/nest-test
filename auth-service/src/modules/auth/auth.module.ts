import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigModule } from 'src/shared/modules';

@Module({
  imports: [HttpModule, JwtConfigModule, ConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
