import { Component } from '@angular/core';
import { RouterService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TheNFT';

  constructor(private _router: RouterService) {}
}
