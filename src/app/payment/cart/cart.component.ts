import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: { product: Product, quantity: number }[] = [];
  totalPrice: number = 0;
  selectedPaymentMethod: string = '';
  showPaymentOptions: boolean = false;
  paymentSuccess: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const cartItems = this.productService.getCart();
    const productMap = new Map<number, { product: Product, quantity: number }>();

    cartItems.forEach(product => {
      if (productMap.has(product.id)) {
        productMap.get(product.id)!.quantity += 1;
      } else {
        productMap.set(product.id, { product, quantity: 1 });
      }
    });

    this.cart = Array.from(productMap.values());
    this.calculateTotalPrice();
  }

  getTotalPrice(product: Product): number {
    const item = this.cart.find(item => item.product.id === product.id);
    return item ? item.quantity * product.price : 0;
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce((acc, item) => acc + this.getTotalPrice(item.product), 0);
  }

  proceedToPay(): void {
    this.showPaymentOptions = true;
  }

  pay(): void {
    if (this.selectedPaymentMethod) {
      this.paymentSuccess = true;
      setTimeout(() => this.router.navigate(['/order']), 2000); // Redirect to Order component after 2 seconds
    }
  }

  clearCart(): void {
    this.productService.clearCart();
    this.cart = [];
    this.calculateTotalPrice();
  }

  removeItem(product: Product): void {
    this.cart = this.cart.filter(item => item.product.id !== product.id);
    this.productService.clearCart();
    this.cart.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        this.productService.addToCart(item.product);
      }
    });
    this.calculateTotalPrice();
  }

  goToProductList(): void {
    this.router.navigate(['/product-list']);
  }

  showBill(): void {
    this.router.navigate(['/order']);
  }  
}
