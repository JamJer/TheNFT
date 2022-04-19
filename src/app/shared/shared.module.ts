import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { COMPONENTS } from "./components";
import { LoadingComponent } from './components/common/loading/loading.component';

@NgModule({
    imports: [CommonModule, FormsModule, FontAwesomeModule],
    declarations: [...COMPONENTS, LoadingComponent ],
    exports: [...COMPONENTS],
})
export class SharedModule {}