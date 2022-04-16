import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.prod';
import { catchError, map, Observable, of } from 'rxjs';
import { NFTPreview } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  APIPath: string = env.APIUrl + env.APIVer;
  APIFuctions: Array<string> = ['/search', '/accounts'];

  constructor(private http: HttpClient) { }
  
  searchNFT(
    text: string, 
    chain: string = 'ethereum', 
    order_by: string = 'relevance', 
    page_number: number = 1, 
    page_size: number = 10
  ) {
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
      .set('page_size', page_size);
    const config = {
      headers,
      params
    };
    return this._requestNFTs(path, config);
  }

  searchNFTByAccount(
    account: string, 
    chain: string = 'ethereum', 
    continuation: string = 'None', 
    include: string = 'metadata',
    page_size: number = 5
  ) {
    const path: string = this.APIPath + this.APIFuctions[1];
    const headers = new HttpHeaders({
      'Authorization': env.APIKey,
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('account', account)
      .set('chain', chain)
      .set('continuation', continuation)
      .set('include', include)
      .set('page_size', page_size);
    const config = {
      headers,
      params
    };
    return this._requestNFTs(path, config);
  }

  _requestNFTs(path: any, config: any) {
    return this.http.get<Observable<NFTPreview[]>>(path, config).pipe(
      map(response => response),
      catchError((error) => {
        console.log(error);
        return of({});
      })
    );
  }
}
