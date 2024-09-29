import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JSONPlaceholderService {

  private apiUrl = 'https://jsonplaceholder.typicode.com'; 

  constructor(private http: HttpClient) { }

  getData<T>( endpoint: string ): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`);
  }
}
