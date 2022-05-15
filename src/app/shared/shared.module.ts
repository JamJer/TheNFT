import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { COMPONENTS } from "./components";
import { NFTDtailComponent } from './components/main/nftdtail/nftdtail.component';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    declarations: [...COMPONENTS, NFTDtailComponent],
    exports: [
        ...COMPONENTS,
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule,
    ],
})
export class SharedModule {}