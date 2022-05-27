import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseComponent, chainType, DataService, Media, NFTContractType, NFTDetail, NFTransactionQuery, ToolsService, transactionType, UIService } from 'src/app/core';
import { FadeFromBottom, FadeFromTop, ScaleFade, SlideRight } from 'src/app/shared/animations';

@Component({
  selector: 'app-nftdtail',
  templateUrl: './nftdtail.component.html',
  styleUrls: ['./nftdtail.component.scss'],
  animations: [
    ScaleFade,
    FadeFromTop,
    FadeFromBottom,
    SlideRight
  ]
})
export class NFTDtailComponent extends BaseComponent implements OnInit {
  NFTDetailObject!: NFTDetail;
  mediaObject!: Media;
  contractObject!: {
    contract_address: string,
    contract_symbol: string,
    contract_name: string,
    contract_type: NFTContractType
  };
  detailContent!: {
    NFTName: string,
    NFTDescription: string,
    NFTOwned: string
  }  
  chainTypes = chainType;
  NO_DATA_STRING = "NO Data";

  constructor(private uiservice: UIService, private dataservice: DataService) {
    super();
  }

  ngOnInit(): void {
    this.initDetailObject();
    console.log(this.NFTDetailObject);
    this.initMediaObject();
    this.initContract();
    this.initDetailContent();
    this.initTransaction();
  }

  initDetailObject(): void {
    this.NFTDetailObject = this.uiservice.currentNFTDetail;
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

  initContract(): void {
    const {contract_address} = this.NFTDetailObject.nft;
    const {name, symbol, type} = this.NFTDetailObject.contract || {};

    this.contractObject = {
      contract_address: contract_address,
      contract_name: name ?? this.NO_DATA_STRING,
      contract_symbol: symbol ?? this.NO_DATA_STRING,
      contract_type: type ?? NFTContractType.UNDEFINED
    }
  }

  initDetailContent(): void {
    const {owner, ...rest} = this.NFTDetailObject;
    const {name, description} = rest.nft?.metadata || {};
    this.detailContent = {
      NFTName: name ?? this.NO_DATA_STRING,
      NFTDescription: description ?? this.NO_DATA_STRING,
      NFTOwned: owner ?? this.NO_DATA_STRING
    };
  }

  initTransaction(): void {
    const {chain, contract_address, token_id} = this.NFTDetailObject.nft;
    const transactionQeury = {
      type: [transactionType.all],
      chain: chain,
      contract_address: contract_address,
      token_id: token_id
    };
    const nftransactions$ = this.dataservice.getNFTransactions(transactionQeury);
    let subscriber$ = new Subscription;
    subscriber$ = nftransactions$.subscribe(
      response => {
        console.log(response);
      }
    );
  }

  trimAddress(str: string) {
    return ToolsService.smartTrim(str, 10);
  }
}
