import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { chainType, DataService, NFTCard, NFTDetailQuery, ToolsService, UIFuncType, UIService } from 'src/app/core';
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

  chainTypes = chainType;
  
  constructor(private dataService: DataService, private uiservice: UIService) { }

  ngOnInit(): void {
    const imgUrl = this.cardObj.cached_file_url;
    this.isImage = ToolsService.checkIfImgURL(imgUrl);
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
    const {contract_address, token_id, chain, ...rest} = this.cardObj;
    const query: NFTDetailQuery = {
      contract_address: contract_address,
      token_id: token_id,
      chain: chain,
      refresh_metadata: true
    };
    console.log(query);
    this.uiservice.UIStatus = UIFuncType.NFTDetail;
    this.dataService.getNFTDetail(query).subscribe(
      response => {
        this.uiservice.currentNFTDetail = response;
      }
    );
  }
}
