import { Component, OnInit } from '@angular/core';
import { BaseComponent, UIFuncType, UIService } from 'src/app/core';
import { FadeFromLeft, FadeFromBottom, FadeFromTop, Fade } from '../../animations';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private uiservice: UIService, private router: Router, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
  }

  setUI(uiType: UIFuncType) {
    this.router.navigate([uiType === UIFuncType.default ? '/home' : uiType], {relativeTo: this.activatedRoute});
  }
}
