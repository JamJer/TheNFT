import { Component, Input, OnInit } from '@angular/core';
import { Fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-bar-loading',
  templateUrl: './bar-loading.component.html',
  styleUrls: ['./bar-loading.component.scss'],
  animations: [
    Fade
  ]
})
export class BarLoadingComponent implements OnInit {
  @Input()
  isLoading?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
