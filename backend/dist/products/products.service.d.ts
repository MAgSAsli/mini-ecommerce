import { Product } from './product.interface';
export declare class ProductsService {
    private products;
    findAll(category?: string, search?: string): Product[];
    findOne(id: number): Product;
    deductStock(id: number, qty: number): Product;
}
