import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BaseComponent, NFTDetail } from 'src/app/core';
import { fromEvent, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-carousel-slider',
  templateUrl: './carousel-slider.component.html',
  styleUrls: ['./carousel-slider.component.scss']
})
export class CarouselSliderComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() 
  nftArray?: NFTDetail[];
  @ViewChild("slider") slider!: ElementRef;
  @ViewChild("prev") prevbtn!: ElementRef;
  @ViewChild("next") nextbtn!: ElementRef;
  @ViewChildren("card") slides!: QueryList<ElementRef>;

  private _carouseler!: {
    slider: ElementRef,
    slides: QueryList<ElementRef>,
    controls: {
      prevbtn: ElementRef,
      nextbtn: ElementRef,
    },
    isMouseDown: boolean,
    startPosX: number,
    scrollLeft: number,
    goNext(scrollAMount: number): void,
    goPrev(scrollAMount: number): void,
  };

  arrowSide: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const sliderElmt = this.slider.nativeElement;
    let scrollMount = Math.round(
      (sliderElmt.offsetWidth + 20)
    );
    this._carouseler = {
      slider: this.slider,
      slides: this.slides,
      controls: {
        prevbtn: this.prevbtn,
        nextbtn: this.nextbtn,
      },
      isMouseDown: false,
      startPosX: 0,
      scrollLeft: this.slider.nativeElement.offsetLeft,
      goNext: (scrollAMount: number) => {
        horizonScroll(this.slider, 'left', scrollAMount);
      },
      goPrev: (scrollAMount: number) => {
        horizonScroll(this.slider, 'right', scrollAMount);
      }
    };

    const horizonScroll = (elmt: ElementRef, side: string, scrollAmount: number) => {
      const container = elmt.nativeElement;
      const maxWidth = container.clientWidth;

      container.scrollTo({
        top: 0,
        left: side === 'left' ? Math.max(scrollAmount, maxWidth) : Math.min(scrollAmount, 0),
        behavior: 'smooth',
      });
      this._carouseler.scrollLeft += scrollAmount;
    };

    const clicksNext$ = fromEvent(this._carouseler.controls.nextbtn.nativeElement, 'click').pipe(
      takeUntil(this.destroy$),
      tap(() => {
        const sliderElmt = this._carouseler.slider.nativeElement;
        const slidesElmts = this._carouseler.slides;
        let scrollAMount = Math.round(
          (sliderElmt.offsetWidth + 20) - (sliderElmt.scrollLeft % (slidesElmts.get(0)?.nativeElement.offsetWidth + 20)));
        this._carouseler.goNext(scrollAMount);
      })
    );

    const clicksPrev$ = fromEvent(this._carouseler.controls.prevbtn.nativeElement, 'click').pipe(
      takeUntil(this.destroy$),
      tap(() => {
        const sliderElmt = this._carouseler.slider.nativeElement;
        const slidesElmts = this._carouseler.slides;
        let scrollAMount = Math.round(
          sliderElmt.offsetWidth + 20) - 
          (Math.round((slidesElmts.get(0)?.nativeElement.offsetWidth + 20)) - (sliderElmt.scrollLeft % (Math.round(slidesElmts.get(0)?.nativeElement.offsetWidth + 20))))
        this._carouseler.goPrev(scrollAMount);
      })
    );
    
    const sliderScroll$ = fromEvent(this._carouseler.slider.nativeElement, "scroll").pipe(
      takeUntil(this.destroy$),
      tap((event: any) => {
        const sliderElmt = event.target;
        this.arrowSide = (sliderElmt.offsetWidth + sliderElmt.scrollLeft >= sliderElmt.scrollWidth)
      })
    );
    clicksNext$.subscribe();
    clicksPrev$.subscribe();
    sliderScroll$.subscribe();
  }
}
