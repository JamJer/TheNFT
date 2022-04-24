import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { SharedModule } from "src/app/shared";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule, 
        SharedModule,
        InfiniteScrollModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule {}