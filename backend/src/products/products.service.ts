import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Sepatu Sneakers', price: 350000, stock: 10, image: 'https://picsum.photos/seed/shoes/300/200', category: 'Fashion' },
    { id: 2, name: 'Tas Ransel', price: 250000, stock: 5, image: 'https://picsum.photos/seed/bag/300/200', category: 'Fashion' },
    { id: 3, name: 'Headphone Wireless', price: 500000, stock: 8, image: 'https://picsum.photos/seed/headphone/300/200', category: 'Elektronik' },
    { id: 4, name: 'Jam Tangan', price: 450000, stock: 3, image: 'https://picsum.photos/seed/watch/300/200', category: 'Aksesoris' },
    { id: 5, name: 'Kacamata Hitam', price: 150000, stock: 15, image: 'https://picsum.photos/seed/glasses/300/200', category: 'Aksesoris' },
    { id: 6, name: 'Kemeja Polos', price: 120000, stock: 20, image: 'https://picsum.photos/seed/shirt/300/200', category: 'Fashion' },
  ];

  findAll(category?: string, search?: string): Product[] {
    let result = this.products;
    if (category) result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    return result;
  }

  findOne(id: number): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new NotFoundException('Produk tidak ditemukan');
    return product;
  }

  deductStock(id: number, qty: number): Product {
    const product = this.findOne(id);
    product.stock -= qty;
    return product;
  }
}
