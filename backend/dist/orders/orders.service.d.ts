import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './create-order.dto';
export declare class OrdersService {
    private readonly productsService;
    private orders;
    private counter;
    constructor(productsService: ProductsService);
    create(dto: CreateOrderDto): {
        id: number;
        customer: {
            name: string;
            email: string;
            address: string;
        };
        items: {
            qty: number;
            subtotal: number;
            id: number;
            name: string;
            price: number;
            stock: number;
            image: string;
            category: string;
        }[];
        total: number;
        status: string;
        createdAt: string;
    };
    findAll(): any[];
}
