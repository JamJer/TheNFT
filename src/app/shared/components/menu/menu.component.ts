import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { FadeFromLeft, Fade } from '../../animations';
import { BaseComponent, chainType, NFTSearchQuery, order_type, UIService } from 'src/app/core';
import { filter, map, Observable, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [ 
    FadeFromLeft,
    Fade
  ]
})
export class MenuComponent extends BaseComponent implements OnInit {
  filterForm!: FormGroup;
  
  currentChain: any;
  currentOrderBy!: order_type;
  
  chainTypes: Array<any> = Object.keys(chainType);
  currentQuery$!: Observable<NFTSearchQuery>;
  currentFilterForm$!: Observable<any>;

  constructor(private uiservice: UIService, private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createFilterForm();
    this.bindCurrentQuery();
    this.bindFilterForm();
  }

  ngOnChanges() {

  }

  createFilterForm() {
    this.filterForm = this.formBuilder.group({
      selectedChainType: [chainType.ethereum, Validators.required],
      selectedOrderBy: [order_type.relevance, Validators.required]
    })
  }

  bindCurrentQuery() {
    this.currentQuery$ = this.uiservice.selectSearchQuery().pipe(
      takeUntil(this.destroy$),
      map(data => data as NFTSearchQuery),
      filter((data) => 
        Object.keys(data).length > 0
      ),
      tap(data => {
        this.filterForm.patchValue({
          selectedChainType: ('chain' in data) ? data.chain : chainType.ethereum
        });
      })
    );
    this.currentQuery$.subscribe();
  }

  bindFilterForm() {
    this.currentFilterForm$ = this.filterForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    );
    this.currentFilterForm$.subscribe(() => {
      let controls = this.filterForm.controls;
      let newChainType = controls['selectedChainType'].value;
    });
  }
}
