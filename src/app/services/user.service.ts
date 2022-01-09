import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { handleHttpResponseError } from '../helpers/error-handler';

const httpOptionsJSON = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users', httpOptionsJSON)
      .pipe(
        catchError(handleHttpResponseError)
      );
  }

  getUserByID(id: string): Observable<User> {
    return this.http.get<User>('http://localhost:8080/users/' + id, httpOptionsJSON)
      .pipe(
        catchError(handleHttpResponseError)
      );
  }

  editUserByID(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:8080/users/' + user.id, user, httpOptionsJSON)
      .pipe(
        catchError(handleHttpResponseError)
      );
  }

  deleteUserByID(id: string): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/users/' + id)
      .pipe(
        catchError(handleHttpResponseError)
      );
  }

}
