import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Auth API')
  .setDescription('The auth API description')
  .setVersion('1.0')
  .addTag('auth')
  .build();
