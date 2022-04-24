import { Component, Input, OnInit } from '@angular/core';
import { NFTPreview, DataService, ToolsService } from 'src/app/core';
import { ScaleFade, ScaleFadeStagger, Fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-nftcard',
  templateUrl: './nftcard.component.html',
  styleUrls: ['./nftcard.component.scss'],
  animations: [
    ScaleFade,
    ScaleFadeStagger,
    Fade
  ]
})
export class NFTCardComponent implements OnInit {
  @Input()
  cardObj!: NFTPreview;

  isImage: boolean = false;
  isLoading: boolean = true;
  
  constructor(private ds: DataService, private ts: ToolsService) { }

  ngOnInit(): void {
    let imgUrl = this.cardObj.cached_file_url;
    this.isImage = this.ts.checkIfImgURL(imgUrl);
  }

  loaded() {
    this.isLoading = false;
  }
}
