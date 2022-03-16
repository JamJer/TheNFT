import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit(): void {
  }
}
