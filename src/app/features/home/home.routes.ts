import { Routes } from "@angular/router";
import { UIFuncType } from "src/app/core";
import { NFTDtailComponent, SearchingComponent, DefaultComponent } from "src/app/shared/components/main";
import { HomeComponent } from "./home.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: DefaultComponent,
            },
            {
                path: UIFuncType.searching,
                component: SearchingComponent,
            },
            {
                path: UIFuncType.NFTDetail,
                component: NFTDtailComponent,
            },
            {
                path: '**',
                component: DefaultComponent,
            }
        ]
    }
];