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
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  images?: string[];

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsString()
  @IsNotEmpty()
  scu: string;

  @IsOptional()
  attributes?: Record<string, any>;
}
