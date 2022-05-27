import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { NFTCard, NFTDetail, NFTSearchQuery, UIFuncType} from '../../models';
import { ToolsService } from '../commons/tools.service';
import { environment as env } from 'src/environments/environment.prod';
import { NavigationEnd, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  private _stateSource$!: BehaviorSubject<UIState>;
  private state$: Observable<UIState>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this._stateSource$ = new BehaviorSubject<UIState>({
      searchQuery: {} as NFTSearchQuery,
      currentNFT: env.tmpNFT as unknown as NFTDetail,
      searchNFTs: [],
      isSearching: false,
      UIStatus: UIFuncType.default,
    });
    this.state$ = this._stateSource$.asObservable();
  }

  // -------UI state-------
  private _getCurrentState(): UIState {
    return {...this._stateSource$.value as UIState};
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
    return {...this._getCurrentState().searchQuery};
  }

  updateSearchQuery(updates: Partial<NFTSearchQuery>): void {
    if(!Object.entries(this.SearchQuery).length) return;
    this.SearchQuery = ToolsService.updatePartialObject<NFTSearchQuery>(this.SearchQuery, updates);
  }

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
    const {page_number} = this.SearchQuery;
    if(page_number <= 0) return false;
    const pageNumberObject = {
      page_number: page_number + pageOffset
    };
    this.updateSearchQuery(pageNumberObject);
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

  updateCurrentNFTDetail(updates: Partial<NFTDetail>): void {
    if(!Object.entries(this.currentNFTDetail).length) return;
    this.currentNFTDetail = ToolsService.updatePartialObject<NFTDetail>(this.currentNFTDetail, updates);
  }
  // -------NFT Detail-------
  
  // -------UI Status-------
  set UIStatus(newStatus: UIFuncType) {
    const currentUIStatus = this._getCurrentState().UIStatus;
    const statusString = `[Current: ${currentUIStatus}, New: ${newStatus}]`;
    const errorStrings = [`Unknown current UI type.`, `Unknown new UI type.`];
    console.log(statusString);
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