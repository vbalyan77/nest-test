import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  CommonExceptionFilter,
  HttpExceptionFilter,
  MongoExceptionFilter,
} from './core/filters';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new CommonExceptionFilter(),
    new MongoExceptionFilter(),
    new HttpExceptionFilter(),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
