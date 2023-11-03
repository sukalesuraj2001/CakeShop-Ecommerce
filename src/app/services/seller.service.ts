import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../interfaces/category1';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

 
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  sellerRegister(userData: Register): Observable<Register> {
    return this.http.post<Register>(`${this.apiUrl}/Seller`, userData);
  }

  sellerLogin(userData: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Seller`, userData);
  }

getProducts(){
  return this.http.get(`${this.apiUrl}/Product`);
}

removeProduct(itemId: number) {
  return this.http.delete(`${this.apiUrl}/Product/${itemId}`);
}


addProduct(data:any){

  return this.http.post(`${this.apiUrl}/Products`,data);
}

getOrders(data: any) {
  return this.http.get(`${this.apiUrl}/Order?sellerId=${8}`, data);
}


}
