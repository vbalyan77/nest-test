import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the product', example: 'Table' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the product',
    example: 'Work table',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The price of the product', example: 19.99 })
  price: number;

  @IsOptional()
  @ApiProperty({
    description: 'The images of the product',
    example: ['https://iili.io/JJxhuyB.jpg', 'https://iili.io/JTxhuyB.jpg'],
    required: false,
  })
  images?: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The category of the product',
    example: 'Furniture',
  })
  category: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'Quantity of product in stock', example: 20 })
  stock: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique product identifier',
    example: 'AbET31#1f',
  })
  scu: string;

  @IsOptional()
  @ApiProperty({
    description: 'Additional attributes of the product',
    example: {
      color: 'Red',
      size: 'Medium',
    },
    required: false,
  })
  attributes?: Record<string, any>;
}
