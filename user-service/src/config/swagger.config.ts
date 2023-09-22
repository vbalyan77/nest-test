import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('User API')
  .setDescription('The user API description')
  .setVersion('1.0')
  .addTag('users')
  .build();
