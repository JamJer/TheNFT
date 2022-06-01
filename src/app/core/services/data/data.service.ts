import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../../environments/environment.prod';
import { catchError, map, Observable, of, Subscription, tap } from 'rxjs';
import { NFTCard, NFTSearchQuery, APIFuncType, NFTSearchResponse, NFTDetail, NFTDetailResponse, NFTDetailQuery, NFTransactionsRecords, NFTransactionResponse, NFTransactionQuery, ContractSaleStatistic, ContractSaleStatisticQuery } from '../../models';
import { UIService } from '../UI/ui.service'; 
import { ToolsService } from '../commons';
import { ContractSaleStatisticResponse } from '../../models/data/NFT/Response/Contract/contract.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static APIPath: string;

  constructor(private http: HttpClient,private uiservice: UIService) {
    DataService.APIPath = env.APIUrl + env.APIVer;
  }

  reSearchNFT() {
    const currentQuery = this.uiservice.SearchQuery;
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
    if(!Object.keys(this.uiservice.SearchQuery).length) return;
    if(this.uiservice.flipPage(pageOffset)) {
      let subscriber$: Subscription;
      subscriber$ = this.searchNFT(this.uiservice.SearchQuery).subscribe(
        response => {
          this.uiservice.addToSearchNFTs(response);
          subscriber$.unsubscribe();
        }
      );
    }
  }

  searchNFT(query: NFTSearchQuery): Observable<NFTCard[]> {
    const path = DataService.APIPath + APIFuncType.searchByText;
    const params = new HttpParams({ fromObject: ToolsService.convertToObject(query) });
    const config = {
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
                 query.token_id;
    const {chain} = query;
    const params = new HttpParams({ fromObject: {'chain': chain} });
    const config = {
      params
    };
    return this._requestNFTDetail(path, config);
  }
  
  getNFTransactions(query: NFTransactionQuery): Observable<NFTransactionsRecords[]> {
    const path = DataService.APIPath + 
                 APIFuncType.NFTransactions + 
                 query.contract_address + '/' +
                 query.token_id;
    const {chain, type, page_size, continuation} = query;
    const params = new HttpParams({ 
      fromObject: {
        'chain': chain, 
        'type': type, 
        'page_size': page_size ?? 50, 
        'continuation': continuation ?? ""
      } 
    });
    const config = {
      params
    };
    return this._requestNFTransactions(path, config);
  }

  getContractStatistic(query: ContractSaleStatisticQuery): Observable<ContractSaleStatistic> {
    const path = DataService.APIPath + 
                 APIFuncType.ContractSaleStatistic + 
                 query.contract_address;
    const {chain} = query;
    const params = new HttpParams({ 
      fromObject: {
        'chain': chain,
      } 
    });
    const config = {
      params
    };
    return this._requestContractStatistic(path, config);
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
      catchError((error) => {
        console.log(error);
        return of({} as NFTDetail);
      })
    );
  }

  private _requestNFTransactions(path: string, config: any): Observable<NFTransactionsRecords[]> {
    return this.http.get<Observable<NFTransactionsRecords[]>>(path, config).pipe(
      map(data => {
        console.log(data);
        const {transactions, continuation} = (<NFTransactionResponse><unknown>data);
        this.uiservice.currentNFTDetail.continuation = continuation ?? "";
        return transactions as NFTransactionsRecords[];
      })
    );
  }

  private _requestContractStatistic(path: string, config: any): Observable<ContractSaleStatistic> {
    return this.http.get<Observable<ContractSaleStatistic>>(path, config).pipe(
      map(data => {
        console.log(data);
        const { statistics } = (<ContractSaleStatisticResponse><unknown>data);
        return statistics as ContractSaleStatistic;
      })
    );
  }
}