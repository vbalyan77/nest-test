import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  images: [string];

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, unique: true, index: true })
  scu: string;

  @Prop({ required: false, type: Object })
  attributes?: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
