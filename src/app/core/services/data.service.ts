import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.prod';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { NFTPreview, NFTsearchTypes, NFTSearchByText, APIFuncType } from '../models';
import { UIService } from './ui.service'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {
  APIPath: string = env.APIUrl + env.APIVer;

  constructor(private http: HttpClient,private uiservice: UIService) { }
  
  convertToObject(query: any) {
    let result: Record<string,string> = {};
    const keysOfProps = Object.keys(query);
    for(let i = 0 ; i < keysOfProps.length ; i++) {
      result[keysOfProps[i]] = String(query[keysOfProps[i]]);
    }
    return result;
  }

  isTextSearch(query: NFTsearchTypes): query is NFTSearchByText {
    return (<NFTSearchByText>query).text !== undefined;
  }

  searchNFT(query: NFTsearchTypes): Observable<NFTPreview | {}> {
    const path: string = this.APIPath + (this.isTextSearch(query) ? APIFuncType.searchByText : APIFuncType.searchByAccount);
    const headers = new HttpHeaders({
      'Authorization': env.APIKey,
      'Content-Type': 'application/json'
    });
    const params = new HttpParams({ fromObject: this.convertToObject(query) });
    const config = {
      headers,
      params
    };
    this.uiservice.changeSearchingStatus(true);
    this.uiservice.changeSearchQuery(query);

    return this._requestNFTs(path, config);
  }

  scrollSearch(pageOffset: number) {
    const currentQuery = this.uiservice.getSearchQuery();
    if(!Object.keys(currentQuery).length) return;
    if(this.uiservice.flipPage(pageOffset)) {
      let obs$: Observable<any> = this.searchNFT(<NFTsearchTypes>currentQuery);
      obs$.subscribe(
        response => {
          this.uiservice.addToSearchNFTs(response.search_results);
        }
      );
    }
  }

  _requestNFTs(path: any, config: any): Observable<NFTPreview[] | {}>{
    return this.http.get<Observable<NFTPreview[]>>(path, config).pipe(
      map(response => response),
      tap(() => {
        this.uiservice.changeSearchingStatus(false);
      }),
      catchError((error) => {
        console.log(error);
        return of({});
      })
    );
  }
}