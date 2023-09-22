import { ProductService } from './product.service';
import { PaginateResult } from 'mongoose';
import { Product } from './product.schema';
import { FindAllProductsDto, UpdateProductDto, CreateProductDto } from './dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(query: FindAllProductsDto): Promise<PaginateResult<Product>>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
}
