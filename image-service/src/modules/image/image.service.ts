import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IImage } from '../../shared/interfaces';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<IImage>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async uploadImage(base64Data: string): Promise<IImage> {
    const formData = new FormData();
    const imageHostURL: string =
      this.configService.get<string>('IMAGE_API_URL');

    formData.append('source', base64Data);
    const response = await firstValueFrom(
      this.httpService.post(`${imageHostURL}upload`, formData, {
        headers: formData.getHeaders(),
        params: {
          key: '6d207e02198a847aa98d0a2a901485a5',
        },
      }),
    );

    const { data } = response;

    const image = new this.imageModel({
      filename: data.image.image.filename,
      name: data.image.image.name,
      mime: data.image.image.mime,
      extension: data.image.image.extension,
      url: data.image.image.url,
      size: data.image.image.size,
    });

    return image.save();
  }
}
