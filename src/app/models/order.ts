export class Order {
  id: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  
    constructor(id: number,productName: string, quantity: number, totalPrice: number) {
      this.id = id;
      this.productName = productName;
      this.quantity = quantity;
      this.totalPrice = totalPrice;
    }
  }
  