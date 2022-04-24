import { Component, OnDestroy, OnInit } from '@angular/core';
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
  NFTSearchByText,
  chainType, 
  order_type,
  DataService, 
  UIService 
} from 'src/app/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent implements OnInit, OnDestroy {

  onSearchNFT$ = new Subject<KeyboardEvent>();
  validSearch$?: Observable<any>;
  emptySearch$?: Observable<any>;
  subscription?: Subscription;
  
  delayTime: number = 500;
  default_page_num: number = 1;
  default_page_size: number = 10;

  constructor(private dataservice: DataService, private uiservice: UIService) {
    super();
   }

  ngOnInit(): void {
    let querytext: NFTSearchByText = {
      text: '',
      chain: chainType.ethereum, 
      order_by: order_type.relevance, 
      page_number: this.default_page_num, 
      page_size: this.default_page_size
    };

    this.validSearch$ = this.onSearchNFT$.pipe(
      debounceTime(this.delayTime),
      map(event => (<HTMLInputElement>event.target).value),
      distinctUntilChanged(),
      filter(input => input !== ""),
      tap((text) => {
        querytext.text = text;
        this.uiservice.clearSearchNFTs();
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
        if(Object.keys(response).length) this.uiservice.addToSearchNFTs(response.search_results);
        else this.uiservice.clearSearchNFTs();
      }
    );
  }

  override ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
