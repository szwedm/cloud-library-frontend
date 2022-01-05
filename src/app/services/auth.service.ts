import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {
  }

  signin(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/signin', {username, password}, httpOptions);
  }

  signup(username: string, password: string, role: string): Observable<any> {
    return this.http.post('http://localhost:8080/users', {username, password, role}, httpOptions);
  }

}
