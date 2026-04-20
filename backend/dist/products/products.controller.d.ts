import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(category?: string, search?: string): import("./product.interface").Product[];
    findOne(id: number): import("./product.interface").Product;
}
