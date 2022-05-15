import { Component, OnInit } from '@angular/core';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { filter, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { 
        BaseComponent, 
        UIService, 
        DataService, 
        UIFuncType
} from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  UIType$?: Observable<UIFuncType>;
  UITypes = UIFuncType;
  onScrollDown$ = new Subject<IInfiniteScrollEvent>();
  scrolldown$?: Observable<any>;

  scrollDownDistance: number = .5;
  scrollUpDistance: number = .5;
  scrollThrottle: number = 300;


  constructor(private uiService: UIService, private dataservice: DataService) { 
    super();
  }

  ngOnInit() {
    this.UIType$ = this.uiService.selectUIStatus();
    this.initScrollListener();
  }

  initScrollListener() {
    this.scrolldown$ = this.onScrollDown$.pipe(
      takeUntil(this.destroy$),
      filter(() => this.uiService.UIStatus === UIFuncType.searching),
    );
    let subscriber$: Subscription;
    subscriber$ = this.scrolldown$.subscribe(
      () => {
        this.dataservice.scrollSearch(1);
      }
    );
  }

  onScrollUp() {
    // Todo something.
  }
}
