import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Product API')
  .setDescription('The product API description')
  .setVersion('1.0')
  .addTag('products')
  .build();
