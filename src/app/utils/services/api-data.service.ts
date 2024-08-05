import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Transaction } from '../Types';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  private readonly baseUrl = 'https://669113eb26c2a69f6e8e56e3.mockapi.io/api';

  constructor(private http: HttpClient) {}

  getData(endpoint: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/${endpoint}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  getSingleData(endpoint: string, id: number | string): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/${endpoint}/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  createData(endpoint: string, data: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  updateData(endpoint: string, id: number, data: any): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/${endpoint}/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  deleteData(endpoint: string, id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/${endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  uploadFile(endpoint: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http
      .post<any>(`${this.baseUrl}/${endpoint}`, formData)
      .pipe(catchError(this.handleError));
  }

  searchData(
    endpoint: string,
    params: { [key: string]: any }
  ): Observable<any[]> {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `${this.baseUrl}/${endpoint}?${queryParams}`
      : `${this.baseUrl}/${endpoint}`;
    return this.http
      .get<any[]>(url)
      .pipe(retry(3), catchError(this.handleError));
  }

  getFilteredData(
    endpoint: string,
    params?: { [key: string]: string }
  ): Observable<Transaction[]> {
    if (params) {
      return this.searchData(endpoint, params);
    } else {
      return this.getData(endpoint);
    }
  }

  createBulkData(endpoint: string, data: any[]): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/${endpoint}/bulk`, data)
      .pipe(catchError(this.handleError));
  }

  updateBulkData(endpoint: string, data: any[]): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/${endpoint}/bulk`, data)
      .pipe(catchError(this.handleError));
  }

  deleteBulkData(endpoint: string, ids: number[]): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { ids },
    };
    return this.http
      .delete<any>(`${this.baseUrl}/${endpoint}/bulk`, options)
      .pipe(catchError(this.handleError));
  }

  getPaginatedData(
    endpoint: string,
    page: number,
    size: number
  ): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/${endpoint}?page=${page}&size=${size}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
