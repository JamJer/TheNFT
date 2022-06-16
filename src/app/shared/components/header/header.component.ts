import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent, NFTDetail, UIFuncType, UIService } from 'src/app/core';
import { FadeFromLeft, FadeFromBottom, FadeFromTop, Fade } from '../../animations';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    FadeFromLeft,
    FadeFromBottom,
    FadeFromTop,
    Fade
  ]
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Input()
  isScrolledOnDefault: boolean = false;
  
  UIType$?: Observable<UIFuncType> = this.uiservice.selectUIStatus();
  UITypes = UIFuncType;
  isProgressing$?: Observable<boolean> = this.uiservice.selectIsProgressing();
  NFTPromo!: NFTDetail[];

  constructor(private uiservice: UIService, private router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.initNFTPromo();
  }

  setUI(uiType: UIFuncType) {
    this.router.navigate([uiType === UIFuncType.default ? '/home' : uiType], {relativeTo: this.activatedRoute});
  }

  initNFTPromo(): void {
    this.NFTPromo = this.uiservice.promoNFT;
  }
}
