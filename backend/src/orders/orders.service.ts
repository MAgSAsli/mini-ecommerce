import { Injectable, BadRequestException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class OrdersService {
  private orders: any[] = [];
  private counter = 1;

  constructor(private readonly productsService: ProductsService) {}

  create(dto: CreateOrderDto) {
    for (const item of dto.items) {
      const product = this.productsService.findOne(item.productId);
      if (product.stock < item.qty)
        throw new BadRequestException(`Stok ${product.name} tidak cukup`);
    }

    const orderItems = dto.items.map(item => {
      const product = this.productsService.deductStock(item.productId, item.qty);
      return { ...product, qty: item.qty, subtotal: product.price * item.qty };
    });

    const order = {
      id: this.counter++,
      customer: dto.customer,
      items: orderItems,
      total: orderItems.reduce((sum, i) => sum + i.subtotal, 0),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.orders.push(order);
    return order;
  }

  findAll() {
    return this.orders;
  }
}
