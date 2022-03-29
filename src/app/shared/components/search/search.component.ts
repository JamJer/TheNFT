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
  switchMap 
} from 'rxjs';
import { BaseComponent, DataService } from 'src/app/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent implements OnInit, OnDestroy {

  onSearchNFT$ = new Subject<KeyboardEvent>();

  validSearch$: Observable<any> | undefined;
  emptySearch$: Observable<any> | undefined;
  
  subscription: Subscription | undefined;
  
  constructor(private dataservice: DataService) {
    super();
   }

  ngOnInit(): void {
    this.validSearch$ = this.onSearchNFT$.pipe(
      debounceTime(1000),
      map(event => (<HTMLInputElement>event.target).value),
      distinctUntilChanged(),
      filter(input => input !== ""),
      switchMap(data => this.dataservice.searchNFT(data))
    );

    this.emptySearch$ = this.onSearchNFT$.pipe(
      debounceTime(1000),
      map(event => (<HTMLInputElement>event.target).value),
      filter(input => input === ""),
      switchMap(data => of({}))
    );
    
    this.subscription = merge(this.validSearch$, this.emptySearch$).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  override ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
