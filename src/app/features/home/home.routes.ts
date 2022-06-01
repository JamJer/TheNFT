import { Routes } from "@angular/router";
import { UIFuncType } from "src/app/core";
import { NFTDtailComponent, SearchingComponent } from "src/app/shared/components/main";
import { IntroComponent } from "../intro/intro.component";
import { HomeComponent } from "./home.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: NFTDtailComponent,
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
                component: NFTDtailComponent,
            }
        ]
    }
];