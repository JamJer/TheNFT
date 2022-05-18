import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { 
  debounceTime, 
  distinctUntilChanged, 
  filter,
  map, 
  merge, 
  Observable, 
  of, 
  Subject, 
  Subscription, 
  switchMap, 
  tap
} from 'rxjs';
import { 
  BaseComponent, 
  chainType, 
  order_type,
  DataService, 
  UIService, 
  UIFuncType,
  pageSize
} from 'src/app/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input()
  isOnHeader: boolean = false;

  onSearchNFT$ = new Subject<KeyboardEvent>();
  validSearch$?: Observable<any>;
  emptySearch$?: Observable<any>;
  subscription?: Subscription;
  
  delayTime: number = 500;

  queryString: string = '';

  constructor(private dataservice: DataService, private uiservice: UIService) {
    super();
   }

  ngOnInit(): void {
    const currentQuery = this.uiservice.SearchQuery;
    this.queryString = currentQuery.text ?? '';

    const querytext = {
      text: this.queryString,
      chain: chainType.ethereum, 
      order_by: order_type.relevance, 
      page_number: 1, 
      page_size: pageSize.default
    };

    this.validSearch$ = this.onSearchNFT$.pipe(
      debounceTime(this.delayTime),
      map(event => (<HTMLInputElement>event.target).value),
      distinctUntilChanged(),
      filter(input => input !== ""),
      tap((text) => {
        querytext.text = text;
        this.uiservice.clearSearchNFTs();
        this.uiservice.UIStatus = UIFuncType.searching;
      }),
      switchMap(data => this.dataservice.searchNFT(querytext))
    );

    this.emptySearch$ = this.onSearchNFT$.pipe(
      map(event => (<HTMLInputElement>event.target).value),
      filter(input => input === ""),
      switchMap(data => of({}))
    );
    
    this.subscription = merge(this.validSearch$, this.emptySearch$).subscribe(
      response => {
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
        if(!Object.entries(response).length) {
          this.uiservice.SearchingStatus = false;
          this.uiservice.clearSearchNFTs();
        }
        this.uiservice.addToSearchNFTs(response);
      }
    );
  }

  override ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
