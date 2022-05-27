import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { chainType, DataService, Media, NFTCard, NFTDetailQuery, ToolsService, UIFuncType, UIService } from 'src/app/core';
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
  cardObj!: NFTCard;

  @ViewChild('NFTTitle', { static: true }) NFTTile: ElementRef | undefined;
  @ViewChild('NFTDescription', { static: true }) NFTDescription: ElementRef | undefined;
  
  isImage: boolean = false;
  isLoading: boolean = true;
  titleScroll: boolean = false;
  descriptionScroll: boolean = false;
  mediaObject!: Media;

  chainTypes = chainType;
  
  constructor(private dataService: DataService, private uiservice: UIService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const imgUrl = this.cardObj.cached_file_url;
    const {cached_file_url, name} = this.cardObj;
    
    this.isImage = ToolsService.checkIfImgURL(imgUrl);
    this.mediaObject = {
      media_name: name,
      media_cached_url: cached_file_url,
      auto_start: false
    };
  }


  ngAfterContentChecked () {
    this.checkScrollEnable();
  }

  loaded() {
    this.isLoading = false;
  }

  checkScrollEnable() {
    const elmt = this.NFTTile?.nativeElement;
    const elmt2 = this.NFTDescription?.nativeElement;

    if (elmt.scrollWidth > elmt.offsetWidth ) {
      this.titleScroll = true;
    }

    if(elmt2.scrollHeight > elmt2.offsetHeight) {
      this.descriptionScroll = true;
    }
  }

  onClickCard() {
    const {contract_address, token_id, chain} = this.cardObj;
    const query = {
      contract_address: contract_address,
      token_id: token_id,
      chain: chain,
      refresh_metadata: true
    };
    
    this.dataService.getNFTDetail(query as NFTDetailQuery).subscribe(
      response => {
        const NFTDetailObject = response;
        const { name, description } = NFTDetailObject?.nft?.metadata ?? {};
        
        NFTDetailObject.nft.metadata = {
          ...NFTDetailObject.nft.metadata,
          name: name ?? this.cardObj.name
        }
        NFTDetailObject.nft.metadata = {
          ...NFTDetailObject.nft.metadata,
          description: description ?? this.cardObj.description
        }

        this.uiservice.currentNFTDetail = response;
        // window.scrollTo(0, 0);
        this.router.navigate(['../'+UIFuncType.NFTDetail], {relativeTo: this.activatedRoute});
      }
    );
  }
}
