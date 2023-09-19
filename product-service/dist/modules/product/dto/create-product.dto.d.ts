export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    images?: string[];
    category: string;
    stock: number;
    scu: string;
    attributes?: Record<string, any>;
}
