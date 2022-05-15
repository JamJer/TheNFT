import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { NFTCard, NFTDetail, NFTSearchQuery, UIFuncType} from '../../models';
import { ToolsService } from '../commons/tools.service';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  private _stateSource$!: BehaviorSubject<UIState>;
  private state$: Observable<UIState>;

  constructor() {
    this._stateSource$ = new BehaviorSubject<UIState>({
      searchNFTs: [],
      isSearching: false,
      searchQuery: {} as NFTSearchQuery,
      UIStatus: UIFuncType.searching,
      currentNFT: {} as NFTDetail,
    });
    this.state$ = this._stateSource$.asObservable()
  }

  // -------UI state-------
  private _getCurrentState(): UIState {
    return this._stateSource$.value as UIState;
  }

  // -------NFT Search-------
  addToSearchNFTs(NFTsToAdd: NFTCard[]): void {
    const current = this._getCurrentState().searchNFTs;
    const FilteredNFTsToAdd = ToolsService.filterInvalidNFT(NFTsToAdd);

    this._stateSource$.next({
      ...this._getCurrentState(),
      searchNFTs: [...current, ...FilteredNFTsToAdd],
    });
  }
  
  selectSearchNFTs(): Observable<NFTCard[]> {
    return this.state$.pipe(
      map(state => state.searchNFTs)
    ) as Observable<NFTCard[]>;
  }
  
  clearSearchNFTs(): void {
    this._stateSource$.next({
      ...this._getCurrentState(),
      searchNFTs: [],
    });
  }
  // -------NFT Search-------

  // -------NFT Searching Status-------
  set SearchingStatus(newStatus: boolean) {
    this._stateSource$.next({
      ...this._getCurrentState(),
      isSearching: newStatus,
    });
  }

  get SearchingStatus(): boolean {
    return this._getCurrentState().isSearching;
  }

  selectSearchingStatus(): Observable<boolean> {
    return this.state$.pipe(
      map(state => state.isSearching),
    ) as Observable<boolean>;
  }
  // -------NFT Searching Status-------

  // -------NFT Search Querty-------
  set SearchQuery(query: NFTSearchQuery) {
    this._stateSource$.next({
      ...this._getCurrentState(),
      searchQuery: query,
    });
  }

  get SearchQuery(): NFTSearchQuery {
    return this._getCurrentState().searchQuery;
  }

  // updateSearchQuery(queryKey: keyof NFTSearchQuery, queryValue: any) {
  //   const currentQuery = this._getCurrentState().searchQuery as NFTSearchQuery;
  //   if(Object.keys(currentQuery).length) {
  //     currentQuery[queryKey] = queryValue;
  //   }
  // }

  selectSearchQuery(): Observable<NFTSearchQuery>{
    return this.state$.pipe(
      map(state => state.searchQuery)
    ) as Observable<NFTSearchQuery>;
  }

  clearSearchQuery(): void {
    this._stateSource$.next({
      ...this._getCurrentState(),
      searchQuery: {} as NFTSearchQuery
    });
  }

  flipPage(pageOffset: number): boolean {
    const currentQuery = this.SearchQuery;
    if(!Object.entries(currentQuery).length) return false;
    currentQuery.page_number += pageOffset;
    this.SearchQuery = currentQuery;
    return true;
  }
  // -------NFT Search Query-------
  
  // -------NFT Detail-------
  set currentNFTDetail(currentNFT: NFTDetail) {
    this._stateSource$.next({
      ...this._getCurrentState(),
      currentNFT: currentNFT,
    });
  }

  get currentNFTDetail(): NFTDetail {
    return this._getCurrentState().currentNFT;
  }
  // -------NFT Detail-------
  
  // -------UI Status-------
  set UIStatus(newStatus: UIFuncType) {
    const currentUIStatus = this._getCurrentState().UIStatus;
    const statusString = `[Current: ${currentUIStatus}, New: ${newStatus}]`;
    const errorStrings = [`Unknown current UI type.`, `Unknown new UI type.`];

    switch(currentUIStatus) {
      case UIFuncType.default:
        switch(newStatus) {
          case UIFuncType.default: // default => default
            break;
          case UIFuncType.searching: // default => searching
            break;
          case UIFuncType.NFTDetail: // default => NFTDetail
            break;
          default:
            console.log(`${errorStrings[1]} ${statusString}`);
            break;
        }
        break;
      case UIFuncType.searching:
        switch(newStatus) {
          case UIFuncType.default: // searching => default
            this.SearchingStatus = false;
            this.clearSearchQuery();
            this.clearSearchNFTs();
            break;
          case UIFuncType.searching: // searching => searching
            break;
          case UIFuncType.NFTDetail: // searching => NFTDetail
            this.SearchingStatus = false;
            this.clearSearchQuery();
            this.clearSearchNFTs();
            break;
          default:
            console.log(`${errorStrings[1]} ${statusString}`);
            break;
        }
        break;
      case UIFuncType.NFTDetail:
        switch(newStatus) {
          case UIFuncType.default: // NFTDetail => default
            break;
          case UIFuncType.searching: // NFTDetail => searching
            break;
          case UIFuncType.NFTDetail: // NFTDetail => NFTDetail
            break;
          default:
            console.log(`${errorStrings[1]} ${statusString}`);
            break;
        }
        break;
      default:
        console.log(`${errorStrings[0]} ${statusString}`);
        break;
    }
    
    this._stateSource$.next({
      ...this._getCurrentState(),
      UIStatus: newStatus
    });
  }

  get UIStatus(): UIFuncType {
    return this._getCurrentState().UIStatus;
  }

  selectUIStatus(): Observable<UIFuncType> {
    return this.state$.pipe(
      map(state => state.UIStatus)
    ) as Observable<UIFuncType>;
  }
  // -------UI Status-------
}

export interface UIState {
  // NFT Search
  searchQuery: NFTSearchQuery;
  searchNFTs: NFTCard[];
  isSearching: boolean;
  
  // NFT Detail
  currentNFT: NFTDetail;

  // UI Related
  UIStatus: UIFuncType;
}