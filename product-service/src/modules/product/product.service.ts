import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto, FindAllProductsDto, UpdateProductDto } from './dto';
import { PaginateModel } from 'mongoose';
import { Product } from './product.schema';
import { PaginateResult } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: PaginateModel<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(options: FindAllProductsDto): Promise<PaginateResult<Product>> {
    const { page = 1, limit = 10, name } = options;

    const query = name ? { name: new RegExp(name, 'i') } : {};

    return this.productModel.paginate(query, {
      page: Number(page),
      limit: Number(limit),
      lean: true,
    });
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    console.log('MTA');
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }
}
