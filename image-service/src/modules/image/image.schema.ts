import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Image extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mime: string;

  @Prop({ required: true })
  extension: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  size: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
