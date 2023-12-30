import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, Register } from '../interfaces/category1';
import { Profile } from '../interfaces/profileData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {
    const sellerId = localStorage.getItem('sellerId');
    this.isSellerLoggedInSubject.next(!!sellerId);
  }
  // user login and registration Api start

  userRegister(userData: Register): Observable<Register> {
    return this.http.post<Register>(`${this.apiUrl}/User`, userData);
  }

  userLogin(userData: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/User`, userData);
  }
 



  
  // user login and registration Api end

  // profile api start
  addProfile(data: Profile): Observable<Profile[]> {
    return this.http.post<Profile[]>(`${this.apiUrl}/Profile`, data);
  }
  getProfile(): Observable<Profile[]> {
    const x = localStorage.getItem('userId');
    return this.http.get<Profile[]>(`${this.apiUrl}/Profile?userId=${x}`);
  }
  updateProfile(profileData: Profile): Observable<Profile> {
    const userId = localStorage.getItem('userId');
    return this.http.put<Profile>(`${this.apiUrl}/profile/${userId}`, profileData);
  }
   // userProfile end







  //  login and logout functionality


  private isSellerLoggedInSubject = new BehaviorSubject<boolean>(false);
  isSellerLoggedIn$ = this.isSellerLoggedInSubject.asObservable();


  setSellerLoggedInStatus(isLoggedIn: boolean) {
    this.isSellerLoggedInSubject.next(isLoggedIn);
  }
}
