import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FindAllProductsDto {
  @IsNumberString()
  @ApiProperty({
    description: 'Page number',
    example: 1,
  })
  page: string;

  @ApiProperty({
    description: 'Document limit',
    example: 1,
  })
  @IsNumberString()
  limit: string;

  @ApiProperty({
    description: 'String to search by name',
    example: 'table',
    required: false,
  })
  @IsOptional()
  name?: string;
}
