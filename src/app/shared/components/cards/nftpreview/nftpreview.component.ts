import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, chainType, Media, NFTDetail, UIFuncType, UIService } from 'src/app/core';
import { ScaleFade } from 'src/app/shared/animations';

@Component({
  selector: 'app-nftpreview',
  templateUrl: './nftpreview.component.html',
  styleUrls: ['./nftpreview.component.scss'],
  animations: [
    ScaleFade,
  ],
})
export class NftpreviewComponent extends BaseComponent implements OnInit {
  @Input()
  NFTDetailObject!: NFTDetail;
  @Input()
  isClickable: boolean = false;
  @Input()
  isInfoBarShown: boolean = false;
  @Input()
  isTitleMaskShown: boolean = false;
  
  chainTypes = chainType;
  mediaObject!: Media;
  NO_DATA_STRING = "NO Data";


  constructor(private router: Router, private uiservice: UIService, private activatedRoute: ActivatedRoute) {
    super();
   }

  ngOnInit(): void {
    this.initMediaObject();
  }

  initMediaObject(): void {
    const { cached_file_url, ...rest } = this.NFTDetailObject.nft;
    const { name, animation_url } = rest.metadata ?? {};

    this.mediaObject = {
      media_name: name ?? this.NO_DATA_STRING,
      media_url: animation_url,
      media_cached_url: cached_file_url ?? this.NO_DATA_STRING,
      auto_start: true
    }
  }

  onGoToDetail(): void {
    if(!this.isClickable) return;
    const NFTDetailObject = this.NFTDetailObject;
    const { name, description } = NFTDetailObject?.nft?.metadata ?? {};
    
    NFTDetailObject.nft.metadata = {
      ...NFTDetailObject.nft.metadata,
      name: name,
    }
    NFTDetailObject.nft.metadata = {
      ...NFTDetailObject.nft.metadata,
      description: description,
    }

    this.uiservice.currentNFTDetail = this.NFTDetailObject;
    this.router.navigate([UIFuncType.NFTDetail], {relativeTo: this.activatedRoute});
  }
}
