import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { COMPONENTS } from "./components";
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from './material';
import { CustomPipes } from "../core";
import { TimeagoModule } from "ngx-timeago";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgChartsModule } from 'ng2-charts';
import { PriceSaleComponent } from './components/commons/price-sale/price-sale.component';

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
    declarations: [...COMPONENTS, ...CustomPipes, PriceSaleComponent],
    exports: [
        ...COMPONENTS,
        ...CustomPipes,
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule,
        TimeagoModule,
    ],
})
export class SharedModule {}