import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart, Product } from '../interfaces/category1';
import { Observable } from 'rxjs';

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

}
