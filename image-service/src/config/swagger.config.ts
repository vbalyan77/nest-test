import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Image API')
  .setDescription('The image API description')
  .setVersion('1.0')
  .addTag('images')
  .build();
