import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart, Product } from '../interfaces/category1';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

addToCart(data:Product):Observable<Product[]>{
  return this.http.post<Product[]>(`${this.apiUrl}/Cart`,data)
}
getCart(data:Cart){
  const user=localStorage.getItem('userId')
  return this.http.get<Cart[]>(`${this.apiUrl}/Cart?userId=${user}`)

}
removeCart(itemId: number) {
  return this.http.delete(`${this.apiUrl}/Cart/${itemId}`);
}
orderProduct(data:any):Observable<Order[]> {
  return this.http.post<Order[]>(`${this.apiUrl}/Buy`, data);
}

// order service start
getOrders():Observable<Order[]>{
  const x=localStorage.getItem("userId")
  return this.http.get<Order[]>(`${this.apiUrl}/Buy?userId=${x}`); 
}
removeOrder(data: Order): Observable<Order[]> {
  const id = data.id; 
  return this.http.delete<Order[]>(`${this.apiUrl}/Buy/${id}`);
}
// wishlist api start

getWishlist(result:Product):Observable<Product>{
  return this.http.post<Product>(`${this.apiUrl}/Wishlist`,result);

}
wishlist():Observable<Product>{
  const x=localStorage.getItem('userId')
    return this.http.get<Product>(`${this.apiUrl}/Wishlist?userId=${x}`);
}

}
