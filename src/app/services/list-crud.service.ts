import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

import { Admission } from '../models/Admission';


@Injectable({
  providedIn: 'root'
})
export class ListCrudService {
private url = "http://localhost:3000/admission";

httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  constructor(
     private errorHandelerService: ErrorHandlerService,
     private http: HttpClient ) {}
   
fetchAll(): Observable<Admission[]> {
  return this.http
  .get<Admission[]>(this.url, { responseType: 'json'})
  .pipe(
    tap((_) => console.log ('fetched admissions')),
    catchError(
      this.errorHandelerService.handleError<Admission[]>('fetchAll', [])
    )
  );
  }
  post(admission:Omit<Admission, "id">): Observable<any> {
    return this.http
    .post<Omit<Admission, "id">>(this.url, admission ,this.httpOptions)
    .pipe(catchError(this.errorHandelerService.handleError<any>("post")));
  }

 update(admission: Admission): Observable<any> {
    return this.http
    .put<Admission>(this.url, admission ,this.httpOptions)
    .pipe(catchError(this.errorHandelerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/admission/${id}`;

    return this.http
    .delete<Admission>(url, this.httpOptions)
    .pipe(catchError(this.errorHandelerService.handleError<any>("delete")));
  }
}

