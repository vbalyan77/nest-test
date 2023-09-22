import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { JwtConfigModule } from './shared/modules';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, JwtConfigModule, AuthModule],
})
export class AppModule {}
