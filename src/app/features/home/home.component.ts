import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { 
        BaseComponent, 
        NFTPreview,
        UIService, 
        DataService 
} from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  NFTSearchCards$?: Observable<NFTPreview[]>;
  isNFTSearching$?: Observable<boolean>;

  scrollDownDistance: number = .5;
  scrollUpDistance: number = .5;
  scrollThrottle: number = 300;

  constructor(private uiService: UIService, private dataservice: DataService) { 
    super();
  }

  ngOnInit() {
    this.NFTSearchCards$ = this.uiService.selectSearchNFTs();
    this.isNFTSearching$ = this.uiService.selectSearchingStatus();
  }
  onScrollDown() {
    console.log("Scroll down");
    this.dataservice.scrollSearch(1);
  }

  onScrollUp() {
    console.log("scrolled up!!");
  }
}
