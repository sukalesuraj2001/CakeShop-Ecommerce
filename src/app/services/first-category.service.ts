import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category1';

@Injectable({
  providedIn: 'root'
})
export class FirstCategoryService {

  constructor(private http:HttpClient) { }

  apiUrl=" http://localhost:3000"


  getCategory():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}/Cakebycategory`)

  }







}
