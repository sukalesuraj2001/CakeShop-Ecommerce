import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../interfaces/category1';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http:HttpClient) { }

  apiUrl=" http://localhost:3000"


getColor():Observable<Color[]>{
  return this.http.get<Color[]>(`${this.apiUrl}/Color`)

}



}
