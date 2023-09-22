import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/core/decorators';
import { RolesGuard, JwtAuthGuard } from 'src/core/guards';
import { PaginateResult } from 'mongoose';
import { Product } from './product.schema';
import { FindAllProductsDto, UpdateProductDto, CreateProductDto } from './dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiCreatedResponse({
    description: 'Successfully created the product.',
    type: CreateProductDto,
  })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query() query: FindAllProductsDto,
  ): Promise<PaginateResult<Product>> {
    return this.productService.findAll(query);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Product.',
    type: CreateProductDto,
  })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({
    description: 'Successfully updated the product.',
    type: UpdateProductDto,
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiNoContentResponse()
  remove(@Param('id') id: string): Promise<Product> {
    return this.productService.remove(id);
  }
}
