import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signin(username: string, password: string) {
    return this.http.post<User>('http://localhost:8080/signin', {username, password});
  }
}
