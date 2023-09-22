import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The name of the product',
    example: 'Table',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the product',
    example: 'Work table',
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'The price of the product',
    example: 19.99,
    required: false,
  })
  price?: number;

  @IsOptional()
  @ApiProperty({
    description: 'The images of the product',
    example: ['https://iili.io/JJxhuyB.jpg', 'https://iili.io/JTxhuyB.jpg'],
    required: false,
  })
  images?: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The category of the product',
    example: 'Furniture',
    required: false,
  })
  category?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Quantity of product in stock',
    example: 20,
    required: false,
  })
  stock?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Unique product identifier',
    example: 'AbET31#1f',
    required: false,
  })
  scu?: string;

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
