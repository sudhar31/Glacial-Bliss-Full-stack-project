export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
  
    constructor(id: number, name: string, description: string, price: number, imageUrl: string, category:string, quantity:number) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.imageUrl = imageUrl;
      this.category = category;
      this.quantity = quantity;
    }
  }
  