import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, Icons, NFTDetail, UIFuncType, UIService } from 'src/app/core';
import { environment as env } from 'src/environments/environment.prod';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent extends BaseComponent implements OnInit {
  trendingNFTs!: NFTDetail[];
  introList!: {
    title: string,
    icon: keyof typeof Icons,
    content: string,
  }[];

  promoMobileSearchSrc?: string;
  UITypes = UIFuncType;
  
  constructor(private _ui: UIService, private router: Router, private activatedRoute: ActivatedRoute) {
    super();
   }

  ngOnInit(): void {
    this.trendingNFTs = this._ui.trendingNFTs;
    this.loadIntroList();
  }

  loadIntroList(): void {
    this.introList = env.introData as unknown as typeof this.introList;
  }

  loadPormoMobileImage($event: any): void {
    this.promoMobileSearchSrc = '../../../../../assets/image/promo/mobile-search-5.gif';
  }

  setUI(uiType: UIFuncType) {
    this.router.navigate([uiType === UIFuncType.default ? '/home' : uiType], {relativeTo: this.activatedRoute});
  }
}
