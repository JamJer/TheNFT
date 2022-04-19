import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { Observable, Subject } from 'rxjs';
import { BaseComponent, NFTPreview, UIService } from 'src/app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {
  NFTSearchCards$: Observable<NFTPreview[]> = this.uiService.selectSearchNFTs();
  constructor(private uiService: UIService) { 
    super();
  }
}
