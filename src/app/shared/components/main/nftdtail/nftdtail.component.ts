import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { BaseComponent, bidsTypes, chainType, ContractSaleStatisticQuery, DataService, listingTypes, Media, NFTContractType, NFTDetail, NFTPortErrorModel, NFTPortErrorResponse, NFTransactionQuery, NFTransactionSales, NFTransactionsRecords, NFTransactionTable, saleTypes, ToolsService, transactionType, transferTypes, UIService } from 'src/app/core';
import { SalePrice } from 'src/app/core/models/data/NFT/Transactions/Sales/price.model';
import { FadeFromBottom, FadeFromTop, ScaleFade, SlideRight } from 'src/app/shared/animations';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';

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
  NULL_ADDRESS_STRING = "NUll";

  transactionSource = new MatTableDataSource<NFTransactionTable>();
  transactionColums = [
    'transaction-event', 
    'transaction-price', 
    'transaction-from', 
    'transaction-to', 
    'transaction-date'
  ];
  
  isTransactionLoading: boolean = true;
  isTransactionLoadFail: {
    noData: boolean,
    hasError: boolean,
    errorMsg: string
  } = {
    noData: false,
    hasError: false,
    errorMsg: ''
  }

  priceSaleData: {
    last?: SalePrice,
    average?: SalePrice,
  } = {
    last: undefined,
    average: undefined,
  };

  priceSaleLineChart!: {
    data: ChartConfiguration['data'],
    options: ChartConfiguration['options'],
    type: ChartType,
  }

  constructor(
    private uiservice: UIService, 
    private dataservice: DataService, 
  ) {
    super();
  }
  
  ngOnInit(): void {
    this.initDetailObject();
    console.log(this.NFTDetailObject);
    this.initMediaObject();
    this.initContract();
    this.initDetailContent();
    this.initTransaction();
    // this.initContractStatistic();
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
    const {continuation, ...rest} = this.NFTDetailObject;
    const {chain, contract_address, token_id} = rest.nft;
    const transactionQeury: NFTransactionQuery = {
      type: [transactionType.all],
      chain: chain,
      contract_address: contract_address,
      token_id: token_id,
      continuation: continuation ?? "",
    };
    const nftransactions$ = this.dataservice.getNFTransactions(transactionQeury);
    let subscriber$ = new Subscription;

    this.isTransactionLoading = true;
    subscriber$ = nftransactions$.subscribe(
      response => {
        const current = this.transactionSource.data;        
        this.transactionSource.data = current.concat(this._processFortransaction(response));
        this.initPriceSaleData();
      },
      err => {
        const error: NFTPortErrorResponse = err.error;
        if(error.error.status_code === 404)
          this.isTransactionLoadFail = {
            noData: true,
            hasError: false,
            errorMsg: error.error.message
        }
        if(error.error.status_code === 422)
          this.isTransactionLoadFail = {
            noData: false,
            hasError: true,
            errorMsg: error.error.message
        }
        this.isTransactionLoading = false;
      },
      () => this.isTransactionLoading = false
    );
  }

  initPriceSaleData(): void {
    if(!this.transactionSource.data.length) return;
    const cloneTransactions: NFTransactionTable[] = [];
    this.transactionSource.data.forEach(element => {
      cloneTransactions.push(Object.assign({}, element));
    });
    const saleHistory = cloneTransactions.filter(
      elemet => elemet.event === saleTypes.sale
    );
    if(!saleHistory.length) return;
    this.priceSaleLineChart =  this._processForPriceChart(saleHistory);
    const { price, priceInUSD } = saleHistory[0];
    this.priceSaleData.last = {
      price: price,
      priceInUsd: priceInUSD,
    };
    const priceAverage = saleHistory.reduce((total, next) => total + (next?.price ?? 0), 0) / saleHistory.length;
    const priceAverageInUsd = (price && priceInUSD) ? (priceAverage * priceInUSD / price) : undefined;
    this.priceSaleData.average = {
      price: priceAverage,
      priceInUsd: priceAverageInUsd,
    };
    console.log(this.priceSaleData);
  }

  initContractStatistic(): void {
    const {chain, contract_address} = this.NFTDetailObject.nft;
    let subscriber$ = new Subscription;
    const ContractSaleStatisticQuery: ContractSaleStatisticQuery = {
      chain: chain,
      contract_address: contract_address,
    };
    subscriber$ = this.dataservice.getContractStatistic(ContractSaleStatisticQuery).subscribe(
      respons => {
        console.log(respons);
      }
    );
  }

  onTransactionsReachBottom(): void {
    const {continuation} = this.NFTDetailObject;
    if(continuation && continuation !== '') this.initTransaction();
  }

  private _processFortransaction(data: NFTransactionsRecords[]): NFTransactionTable[] {
    const _r: NFTransactionTable[] = [];
    data.forEach((d) => {
      const current: NFTransactionTable = {
        event: d.type,
        eventIcon: this.icons[d.type],
        price: undefined,
        priceInUSD: undefined,
        from: undefined,
        to: undefined,
        date: new Date(d.transaction_date)
      }
      switch(d.type) {
        case transferTypes.transfer:
        case transferTypes.mint:
        case transferTypes.burn:
          current.from = d.transfer_from;
          current.to = d.transfer_to ?? (d.type === transferTypes.mint ? d.owner_address : undefined);
          break;
        case bidsTypes.bid:
        case bidsTypes.cancel_bid:
          current.from = d.bidder_address;
          current.price = d.price_details.price;
          break;
        case saleTypes.sale:
          current.from = d.seller_address;
          current.to = d.buyer_address;
          current.price = d.price_details.price;
          current.priceInUSD = d.price_details.price_usd;
          break;
        case listingTypes.list:
        case listingTypes.cancel_list:
          current.from = d.lister_address;
          current.price = d.price_details.price;
          break;
        default:
          console.log('Unkonwn transaction type.');
          break;
      };
      _r.push(current);
    });
    return _r;
  }

  private _processForPriceChart(data: NFTransactionTable[]): typeof this.priceSaleLineChart {
    const priceArray: {
      price: number[],
      date: Date[],
    } = {
      price: [],
      date: [],
    };
    data.forEach(element => {
      if(!element.price || !element.date) return;
      priceArray.price.push(element.price);
      priceArray.date.push(element.date);
    });
    console.log(priceArray);
    const lineChartType: ChartType = 'line';
    const lineChartData: ChartConfiguration['data'] = {
      datasets: [
        {
          data: priceArray.price,
          label: 'Price'
        },
      ],
      labels: priceArray.date,
    };
    const lineChartOptions: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: false,
      animations: {
        radius: {
          duration: 1000,
          easing: 'linear',
          from: 0,
          to: 1,
          loop: false
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
            callbacks: {
              label: function(context) {
                var label = context.dataset.label || '';
                console.log(context.dataset);
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
              }
            }
        }
      },
      scales: {
        x: {
          type: 'time',
          adapters: {
            date: {
              locale: enUS
            }
          },
        }
      }
    };
    return {
      data: lineChartData,
      options: lineChartOptions,
      type: lineChartType,
    } as typeof this.priceSaleLineChart;
  }
}
