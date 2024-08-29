import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  removeProductFromCart(product: Product) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/api/products';
  private cart = new BehaviorSubject<Product[]>(this.getCartFromLocalStorage());
  cart$ = this.cart.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }

  addToCart(product: Product): void {
    const currentCart = this.cart.value;
    currentCart.push(product);
    this.cart.next(currentCart);
    this.saveCartToLocalStorage(currentCart);
  }

  getCart(): Product[] {
    return this.cart.value;
  }

  clearCart(): void {
    this.cart.next([]);
    this.saveCartToLocalStorage([]);
  }

  private getCartFromLocalStorage(): Product[] {
    if (typeof localStorage !== 'undefined') {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } else {
      return [];
    }
  }

  private saveCartToLocalStorage(cart: Product[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  
}
