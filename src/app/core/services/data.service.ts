import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.prod';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  APIPath: string = env.APIUrl + env.APIVer;
  APIFuctions: Array<string> = ['/search'];

  constructor(private http: HttpClient) { }
  
  searchNFT(text: string, chain: string = 'all', order_by: string = 'relevance', page_number: number = 1, page_size: number = 10) {
    const path: string = this.APIPath + this.APIFuctions[0];
    const headers = new HttpHeaders({
      'Authorization': env.APIKey,
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('text', text)
      .set('chain', chain)
      .set('order_by', order_by)
      .set('page_number', page_number)
      .set('page_size', page_size)
    const config = {
      headers,
      params
    };


    return this.http.get<Observable<any>>(path, config).pipe(
      map(response => response),
      catchError((error) => {
        console.log(error);
        return of({});
      })
    );
  }
}
