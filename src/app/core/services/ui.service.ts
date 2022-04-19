import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { NFTPreview } from './../models';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  private _stateSource$ = new BehaviorSubject<UIState>({
    searchNFTs: [],
    isSearching: false 
  });

  private _getCurrentState(): UIState {
    return this._stateSource$.value;
  }

  state$ = this._stateSource$.asObservable();
  
  constructor() { }

  addToSearchNFTs(NFTsToAdd: NFTPreview[]): void {
    this._stateSource$.next({
      ...this._getCurrentState(),
      searchNFTs: NFTsToAdd,
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
}

export interface UIState {
  // filters
  searchNFTs: NFTPreview[];
  isSearching: boolean
}