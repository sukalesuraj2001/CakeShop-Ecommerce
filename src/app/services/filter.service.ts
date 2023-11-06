import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/category1';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http:HttpClient) { }

  apiUrl=" http://localhost:3000"




  getFilterProducts(categoryName:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/Products?categoryName=${categoryName}`)
  }



  getMin(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Products?price_lte=500`);
  }
  getBet(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Products?price_gte=300&price_lte=800`
    );
  }
  getAbove(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Products?price_gte=900`);
  }
}
