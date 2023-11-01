import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Price } from '../interfaces/category1';


@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http:HttpClient) { }

  apiUrl=" http://localhost:3000";

 
getPrice():Observable<Price[]>{
  return this.http.get<Price[]>(`${this.apiUrl}/Price`)
}

}
