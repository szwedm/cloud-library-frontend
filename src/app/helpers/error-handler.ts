import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleHttpResponseError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred: ', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    window.alert(`An error occurred: ${error.status}\n${JSON.stringify(error.error)}\nSee console logs for details`);
    return throwError(() => new Error('Request error!'));
  }