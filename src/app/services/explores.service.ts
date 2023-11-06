import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/category1';

@Injectable({
  providedIn: 'root',
})
export class ExploresService {
  constructor(private http: HttpClient) {}

  apiUrl = ' http://localhost:3000';

  getMenus(){
    return this.http.get(`${this.apiUrl}/Menus`);

  }
  
}
