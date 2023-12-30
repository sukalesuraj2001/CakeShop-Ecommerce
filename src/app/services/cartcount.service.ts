import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../interfaces/category1';

@Injectable({
  providedIn: 'root'
})
export class CartcountService {

  private apiUrl = 'your-api-url';

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  // Use a Subject to notify subscribers about cart updates
  private cartUpdatedSubject = new Subject<void>();
  cartUpdated$ = this.cartUpdatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateCartItemCount(count: number) {
    this.cartItemCountSubject.next(count);
  }

  // getUpdatedCartCount() {
  //   return this.http.get<number>(`${this.apiUrl}/cart/count`);
  // }

  // getCart(data: Product) {
  //   return this.http.get(`${this.apiUrl}/cart/${data.userId}`);
  // }

  // addToCart(data: Product) {
  //   return this.http.post(`${this.apiUrl}/cart/add`, data);
  // }

  // Notify subscribers when the cart is updated
  notifyCartUpdated() {
    this.cartUpdatedSubject.next();
  }
}
