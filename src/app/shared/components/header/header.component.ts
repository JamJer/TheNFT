import { Component, OnInit } from '@angular/core';
import { BaseComponent, UIFuncType, UIService } from 'src/app/core';
import { FadeFromLeft, FadeFromBottom, FadeFromTop, Fade } from '../../animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    FadeFromLeft,
    FadeFromBottom,
    FadeFromTop,
    Fade
  ]
})
export class HeaderComponent extends BaseComponent implements OnInit {  
  UIType$?: Observable<UIFuncType> = this.uiservice.selectUIStatus();
  UITypes = UIFuncType;

  constructor(private uiservice: UIService) {
    super();
  }

  ngOnInit(): void {
  }

  setUI(uiType: UIFuncType) {
    this.uiservice.UIStatus = uiType;
  }
}
