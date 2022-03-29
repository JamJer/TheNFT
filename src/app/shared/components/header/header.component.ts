import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { FadeFromLeft, FadeFromBottom, FadeFromTop } from '../../animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    FadeFromLeft,
    FadeFromBottom,
    FadeFromTop
  ]
})
export class HeaderComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
