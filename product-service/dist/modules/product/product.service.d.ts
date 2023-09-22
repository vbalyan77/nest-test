import { CreateProductDto, FindAllProductsDto, UpdateProductDto } from './dto';
import { PaginateModel } from 'mongoose';
import { Product } from './product.schema';
import { PaginateResult } from 'mongoose';
export declare class ProductService {
    private productModel;
    constructor(productModel: PaginateModel<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(options: FindAllProductsDto): Promise<PaginateResult<Product>>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
}
