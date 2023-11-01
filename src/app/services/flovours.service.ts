import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flovour } from '../interfaces/category1';


@Injectable({
  providedIn: 'root'
})
export class FlovoursService {

  constructor(private http:HttpClient) { }

  apiUrl=" http://localhost:3000";


getFlovour():Observable<Flovour[]>{
  return this.http.get<Flovour[]>(`${this.apiUrl}/Flovour`);
}

}
