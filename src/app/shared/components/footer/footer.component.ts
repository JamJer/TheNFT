import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends BaseComponent implements OnInit {
  nftportImag?: string;
  meImag?: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  isLogoIntoView($event: any) {
    this.nftportImag = "../../../../assets/image/logo/NFTPortLogo.svg";
  }

  isMeIntoView($event: any) {
    this.meImag = "../../../../assets/image/me/joseph.jpg";
  }

  
}
