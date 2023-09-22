import { Document } from 'mongoose';

export interface IImage extends Document {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
  size: number;
}
