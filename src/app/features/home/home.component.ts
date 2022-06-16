import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { ActivatedRoute } from '@angular/router';
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
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    this.isDefaultScrolled = window.pageYOffset > 0;
  }

  UIType$?: Observable<UIFuncType>;
  UITypes = UIFuncType;
  onScrollDown$ = new Subject<IInfiniteScrollEvent>();
  scrolldown$?: Observable<any>;

  scrollDownDistance: number = .1;
  scrollUpDistance: number = .1;
  scrollThrottle: number = 300;

  isDefaultScrolled: boolean = false;

  constructor(
    private uiService: UIService, 
    private dataservice: DataService, 
    private scrollDispatcher: ScrollDispatcher,
  ) { 
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
