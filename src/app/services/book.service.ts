import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../models/book';
import { handleHttpResponseError } from '../helpers/error-handler';

const httpOptionsJSON = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpHeadersPDF = new HttpHeaders({ 'Content-Type': 'application/json',
    responseType: 'blob' });

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:8080/books', httpOptionsJSON)
      .pipe(
        catchError(handleHttpResponseError)
      );
  }

  getBookByID(id: string): Observable<Blob> {
    return this.http.get<Blob>('http://localhost:8080/books/' + id, { headers: httpHeadersPDF, responseType: 'blob' as 'json'})
      .pipe(
        catchError(handleHttpResponseError)
      );
  }

  addBook(formData: FormData) {
    return this.http.post<any>('http://localhost:8080/books', formData, {reportProgress: true, observe: 'events'})
      .pipe(
        catchError(handleHttpResponseError)
      );
  }

}
