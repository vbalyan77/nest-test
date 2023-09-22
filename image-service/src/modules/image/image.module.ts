import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './image.schema';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from 'src/core/guards';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
    ConfigModule,
  ],
  providers: [ImageService, RolesGuard],
  controllers: [ImageController],
})
export class ImageModule {}
