export class CreateOrderDto {
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: {
    productId: number;
    qty: number;
  }[];
}
