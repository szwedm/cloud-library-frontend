import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { handleHttpResponseError } from '../helpers/error-handler';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {
  }

  signin(username: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost:8080/signin', {username, password}, httpOptions)
      .pipe(
        catchError(handleHttpResponseError)
      );
  }

  signup(username: string, password: string, role: string) {
    return this.http.post('http://localhost:8080/users', {username, password, role}, httpOptions)
      .pipe(
        catchError(handleHttpResponseError)
      );
  }
}
