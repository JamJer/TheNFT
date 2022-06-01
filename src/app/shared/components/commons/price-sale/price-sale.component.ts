import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent, chainType } from 'src/app/core';
import { SalePrice } from 'src/app/core/models/data/NFT/Transactions/Sales/price.model';

@Component({
  selector: 'app-price-sale',
  templateUrl: './price-sale.component.html',
  styleUrls: ['./price-sale.component.scss']
})
export class PriceSaleComponent extends BaseComponent implements OnInit {
  @Input()
  priceObect?: SalePrice; 

  chainTypes = chainType;

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
