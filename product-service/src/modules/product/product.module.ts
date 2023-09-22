import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './product.schema';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ConfigModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, RolesGuard],
})
export class ProductModule {}
