import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class ImageDTO extends Document {
  @ApiProperty({ description: 'File name', example: 'JJxhuyB.jpg' })
  filename: string;
  @ApiProperty({ description: 'The name of the product', example: 'JJxhuyB' })
  name: string;
  @ApiProperty({
    description: 'The name of the product',
    example: 'image/jpeg',
  })
  mime: string;
  @ApiProperty({ description: 'The name of the product', example: 'jpg' })
  extension: string;
  @ApiProperty({ description: 'The name of the product', example: '45490' })
  url: string;
  @ApiProperty({ description: 'The name of the product', example: 'Table' })
  size: number;
}
