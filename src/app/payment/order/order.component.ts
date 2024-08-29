import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orderItems: { product: Product, quantity: number }[] = [];
  totalPrice: number = 0;
  showBill: boolean = false;
  bill: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    const cartItems = this.productService.getCart();
    const productMap = new Map<number, { product: Product, quantity: number }>();

    cartItems.forEach(product => {
      if (productMap.has(product.id)) {
        productMap.get(product.id)!.quantity += 1;
      } else {
        productMap.set(product.id, { product, quantity: 1 });
      }
    });

    this.orderItems = Array.from(productMap.values());
    this.calculateTotalPrice();
    this.generateBill();
  }

  getTotalPrice(product: Product): number {
    const item = this.orderItems.find(item => item.product.id === product.id);
    return item ? item.quantity * product.price : 0;
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.orderItems.reduce((acc, item) => acc + this.getTotalPrice(item.product), 0);
  }

  generateBill(): void {
    this.bill = this.orderItems.map(item => `${item.product.name} - Quantity: ${item.quantity} - Price: ₹${this.getTotalPrice(item.product)}`).join('\n');
    this.bill += `\nTotal Price: ₹${this.totalPrice}`;
  }

  printBill(): void {
    const printWindow = window.open('', '', 'height=600,width=800');
    const billHtml = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #fff;
          }
          .header, .footer {
            text-align: center;
            padding: 10px;
            background-color: #f8f9fa;
            border-bottom: 1px solid #ddd;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .logo {
            font-size: 40px;
            color: #007bff;
            font-weight: bold;
            text-align: center;
          }
          .logo span {
            display: block;
          }
          .logo .circle {
            border-radius: 50%;
            background-color: #007bff;
            color: white;
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            margin: 0 auto;
            font-size: 24px;
          }
          .content {
            margin: 20px 0;
          }
          .content h2 {
            font-size: 20px;
            margin-bottom: 10px;
          }
          .content pre {
            white-space: pre-wrap;
            font-size: 16px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 10px;
            text-align: center;
          }
          th {
            background-color: #f8f9fa;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">
            <div class="circle">GB</div>
          </div>
          <h1>Glacial Bliss</h1>
        </div>
        <div class="content">
          <h2>Bill</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${this.orderItems.map(item => `
                <tr>
                  <td>${item.product.name}</td>
                  <td>${item.quantity}</td>
                  <td>₹${this.getTotalPrice(item.product)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="footer">
            <strong>Total Price: ₹${this.totalPrice}</strong>
            <p>Thank you for shopping with us!</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    printWindow!.document.write(billHtml);
    printWindow!.document.close();
    printWindow!.print();
  }

  removeItem(product: Product): void {
    this.orderItems = this.orderItems.filter(item => item.product.id !== product.id);
    this.productService.clearCart();
    this.orderItems.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        this.productService.addToCart(item.product);
      }
    });
    this.calculateTotalPrice();
    this.generateBill();
  }

  clearOrder(): void {
    this.orderItems = [];
    this.productService.clearCart();
    this.calculateTotalPrice();
    this.generateBill();
  }

  resetOrder() {
    this.orderItems = []; 
    this.totalPrice = 0; 
    this.showBill = false; 
    this.bill = ''; 
  }
  
}
