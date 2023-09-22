import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { IImage } from '../../shared/interfaces';
import { JwtAuthGuard, RolesGuard } from 'src/core/guards';
import { Roles } from 'src/core/decorators';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBody,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FileUploadDto, ImageDTO } from './dto';

@ApiTags('images')
@ApiBearerAuth()
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @HttpCode(201)
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('source'))
  @ApiCreatedResponse({
    description: 'Successfully created the product.',
    type: ImageDTO,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'image',
    type: FileUploadDto,
  })
  async upload(@UploadedFile() file: Express.Multer.File): Promise<IImage> {
    const base64Data = file.buffer.toString('base64');
    return this.imageService.uploadImage(base64Data);
  }
}
