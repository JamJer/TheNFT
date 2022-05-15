import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent, DataService, NFTCard, UIService } from 'src/app/core';
import { FadeEnterOnly } from 'src/app/shared/animations';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss'],
  animations: [
    FadeEnterOnly
  ]
})
export class SearchingComponent extends BaseComponent implements OnInit {
  NFTSearchCards$: Observable<NFTCard[]>;
  isNFTSearching$: Observable<boolean>;

  constructor(private uiService: UIService) { 
    super();
    this.NFTSearchCards$ = this.uiService.selectSearchNFTs();
    this.isNFTSearching$ = this.uiService.selectSearchingStatus();
  }

  ngOnInit() {
    
  }

}
