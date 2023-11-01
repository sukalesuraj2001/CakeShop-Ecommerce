import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ocassion } from '../interfaces/category1';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcassionsService {

  constructor(private http:HttpClient) { }

  apiUrl=" http://localhost:3000"

  getOcassion():Observable<Ocassion[]>{
    return this.http.get<Ocassion[]>(`${this.apiUrl}/Ocassions`)

  }
 


}
