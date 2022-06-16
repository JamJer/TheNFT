import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { COMPONENTS } from "./components";
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from './material';
import { CustomDirectives, CustomPipes } from "../core";
import { TimeagoModule } from "ngx-timeago";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgChartsModule } from 'ng2-charts';
import { PriceSaleComponent } from './components/commons/price-sale/price-sale.component';
import { DefaultComponent } from './components/main/default/default.component';
import { NftpreviewComponent } from './components/cards/nftpreview/nftpreview.component';
import { ContainerGalleryHoverComponent } from './components/commons/container-gallery-hover/container-gallery-hover.component';
import { CarouselSliderComponent } from './components/commons/carousel-slider/carousel-slider.component';

const FORSHAREDUSE = [
  PriceSaleComponent,
  DefaultComponent,
  NftpreviewComponent,
  ContainerGalleryHoverComponent,
  CarouselSliderComponent,
];

@NgModule({
    imports: [
        CommonModule,
        SharedMaterialModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        TimeagoModule,
        InfiniteScrollModule,
        NgChartsModule,
    ],
    declarations: [
      ...COMPONENTS,
      ...CustomPipes,
      ...CustomDirectives,
      ...FORSHAREDUSE
    ],
    exports: [
        ...COMPONENTS,
        ...CustomPipes,
        ...CustomDirectives,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TimeagoModule,
    ],
})
export class SharedModule {}
