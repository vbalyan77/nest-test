import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import("./product.schema").Product>;
    findAll(): Promise<import("./product.schema").Product[]>;
    findOne(id: string): Promise<import("./product.schema").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./product.schema").Product>;
    remove(id: string): Promise<import("./product.schema").Product>;
}
