"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
let ProductsService = class ProductsService {
    products = [
        { id: 1, name: 'Sepatu Sneakers', price: 350000, stock: 10, image: 'https://picsum.photos/seed/shoes/300/200', category: 'Fashion' },
        { id: 2, name: 'Tas Ransel', price: 250000, stock: 5, image: 'https://picsum.photos/seed/bag/300/200', category: 'Fashion' },
        { id: 3, name: 'Headphone Wireless', price: 500000, stock: 8, image: 'https://picsum.photos/seed/headphone/300/200', category: 'Elektronik' },
        { id: 4, name: 'Jam Tangan', price: 450000, stock: 3, image: 'https://picsum.photos/seed/watch/300/200', category: 'Aksesoris' },
        { id: 5, name: 'Kacamata Hitam', price: 150000, stock: 15, image: 'https://picsum.photos/seed/glasses/300/200', category: 'Aksesoris' },
        { id: 6, name: 'Kemeja Polos', price: 120000, stock: 20, image: 'https://picsum.photos/seed/shirt/300/200', category: 'Fashion' },
    ];
    findAll(category, search) {
        let result = this.products;
        if (category)
            result = result.filter(p => p.category === category);
        if (search)
            result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        return result;
    }
    findOne(id) {
        const product = this.products.find(p => p.id === id);
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        return product;
    }
    deductStock(id, qty) {
        const product = this.findOne(id);
        product.stock -= qty;
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map