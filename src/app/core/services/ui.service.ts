import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { NFTPreview, NFTSearchByAccount, NFTSearchByText } from './../models';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  private _stateSource$ = new BehaviorSubject<UIState>({
    searchNFTs: [],
    isSearching: false,
    searchQuery: {}
  });

  private _getCurrentState(): UIState {
    return this._stateSource$.value;
  }

  state$ = this._stateSource$.asObservable();
  
  constructor(private toolService: ToolsService) { }

  addToSearchNFTs(NFTsToAdd: NFTPreview[]): void {
    let current: NFTPreview[] = this._getCurrentState().searchNFTs;
    let FilteredNFTsToAdd = this.toolService.filterInvalidNFT(NFTsToAdd);

    this._stateSource$.next({
      ...this._getCurrentState(),
      searchNFTs: current.concat(FilteredNFTsToAdd),
    });
  }

  clearSearchNFTs(): void {
    this._stateSource$.next({
      ...this._getCurrentState(),
      searchNFTs: [],
    });
  }

  selectSearchNFTs(): Observable<NFTPreview[]> {
    return this.state$.pipe(
      map(state => state.searchNFTs)
    );
  }

  changeSearchingStatus(sw: boolean): void {
    this._stateSource$.next({
      ...this._getCurrentState(),
      isSearching: sw,
    });
  }

  selectSearchingStatus(): Observable<boolean> {
    return this.state$.pipe(
      map(state => state.isSearching),
    );
  }

  changeSearchQuery(query: NFTSearchByText | NFTSearchByAccount | {}): void {
    this._stateSource$.next({
      ...this._getCurrentState(),
      searchQuery: query,
    });
  }

  getSearchQuery(): NFTSearchByText | NFTSearchByAccount | {} {
    return this._getCurrentState().searchQuery;
  }

  flipPage(pageOffset: number): boolean {
    let currentQuery: any = this.getSearchQuery();
    if( currentQuery === {}) return false;
    currentQuery.page_number += pageOffset;
    this.changeSearchQuery(currentQuery);
    return true;
  }
}

export interface UIState {
  searchNFTs: NFTPreview[];
  isSearching: boolean;
  searchQuery: NFTSearchByText | NFTSearchByAccount | {};
}