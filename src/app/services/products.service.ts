import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/category1';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  apiUrl=" http://localhost:3000"

getCategoryName(categoryId:number):Observable<Product[]>{
  return this.http.get<Product[]>(`${this.apiUrl}/Products?categoryId=${categoryId}`)

}
getProduct():Observable<Product[]>{
  return this.http.get<Product[]>(`${this.apiUrl}/Products`)


}
getProductDetails(id: number):Observable<Product[]> {
  
  return this.http.get<Product[]>(`${this.apiUrl}/Products?id=${id}`);
}






}
