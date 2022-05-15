import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment.prod';
import { catchError, map, Observable, of, Subscription, tap } from 'rxjs';
import { NFTCard, NFTSearchQuery, APIFuncType, NFTSearchResponse, NFTDetail, NFTDetailResponse, NFTDetailQuery } from '../../models';
import { UIService } from '../UI/ui.service'; 
import { ToolsService } from '../commons';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static APIPath: string;

  constructor(private http: HttpClient,private uiservice: UIService) {
    DataService.APIPath = env.APIUrl + env.APIVer;
  }

  reSearchNFT() {
    const currentQuery = this.uiservice.SearchQuery as NFTSearchQuery;
    if(!Object.keys(currentQuery).length || currentQuery.text === '') return;
    this.uiservice.clearSearchNFTs();
    this.uiservice.SearchingStatus = false;
    let subscriber$: Subscription;
    subscriber$ = this.searchNFT(currentQuery).subscribe(
      response => {
        this.uiservice.addToSearchNFTs(response);
        subscriber$.unsubscribe();
      }
    );
  }

  scrollSearch(pageOffset: number = 1) {
    const currentQuery = this.uiservice.SearchQuery as NFTSearchQuery;
    if(!Object.keys(currentQuery).length) return;
    if(this.uiservice.flipPage(pageOffset)) {
      let subscriber$: Subscription;
      subscriber$ = this.searchNFT(currentQuery).subscribe(
        response => {
          this.uiservice.addToSearchNFTs(response);
          subscriber$.unsubscribe();
        }
      );
    }
  }

  searchNFT(query: NFTSearchQuery): Observable<NFTCard[]> {
    const path = DataService.APIPath + APIFuncType.searchByText;
    const headers = new HttpHeaders({
      'Authorization': env.APIKey,
      'Content-Type': 'application/json'
    });
    const params = new HttpParams({ fromObject: ToolsService.convertToObject(query) });
    const config = {
      headers,
      params
    };
    this.uiservice.SearchingStatus = true;
    this.uiservice.SearchQuery = query;

    return this._requestNFTs(path, config);
  }

  getNFTDetail(query: NFTDetailQuery): Observable<NFTDetail> {
    const path = DataService.APIPath + 
                 APIFuncType.NFTDetail + '/' + 
                 query.contract_address + '/' +
                 query.token_id
    const headers = new HttpHeaders({
      'Authorization': env.APIKey,
      'Content-Type': 'application/json'
    });
    const {chain, ...rest} = query;
    const params = new HttpParams({ fromObject: {'chain': chain} });
    const config = {
      headers,
      params
    };
    return this._requestNFTDetail(path, config);
  }
  
  private _requestNFTs(path: string, config: any): Observable<NFTCard[]> {
    return this.http.get<Observable<NFTCard[]>>(path, config).pipe(
      map(response => (<NFTSearchResponse><unknown>response).search_results),
      tap((response) => {
        this.uiservice.SearchingStatus = false;
      }),
      catchError((error) => {
        console.log(error);
        return of([] as NFTCard[]);
      })
    );
  }

  private _requestNFTDetail(path: string, config: any): Observable<NFTDetail> {
    return this.http.get<Observable<NFTDetail>>(path, config).pipe(
      map(data => {
        const {response, ...rest} = (<NFTDetailResponse><unknown>data);
        return rest as NFTDetail;
      }),
      tap(data => {
        console.log(data);
      }),
      catchError((error) => {
        console.log(error);
        return of({} as NFTDetail);
      })
    );
  }
}