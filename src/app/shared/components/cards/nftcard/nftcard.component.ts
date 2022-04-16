import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/core';
import { NFTPreview } from 'src/app/core';
import { ScaleFade, ScaleFadeStagger } from 'src/app/shared/animations';

@Component({
  selector: 'app-nftcard',
  templateUrl: './nftcard.component.html',
  styleUrls: ['./nftcard.component.scss'],
  animations: [
    ScaleFade,
    ScaleFadeStagger
  ]
})
export class NFTCardComponent implements OnInit {
  @Input()
  cardObj!: NFTPreview;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
  }

}
