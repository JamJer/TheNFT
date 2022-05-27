import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { COMPONENTS } from "./components";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        RouterModule, 
        FormsModule, 
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    declarations: [...COMPONENTS],
    exports: [
        ...COMPONENTS,
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule,
    ],
})
export class SharedModule {}