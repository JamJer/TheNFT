import { Component, OnInit } from '@angular/core';
import { BaseComponent, Icons, NFTDetail, UIService } from 'src/app/core';
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

  constructor(private _ui: UIService) {
    super();
   }

  ngOnInit(): void {
    this.trendingNFTs = this._ui.trendingNFTs;
    this.loadIntroList();
  }

  loadIntroList(): void {
    this.introList = env.introData as unknown as typeof this.introList;
  }
}
