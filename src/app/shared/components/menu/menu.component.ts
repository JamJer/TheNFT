import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { FadeFromLeft, Fade } from '../../animations';
import { BaseComponent, chainType, DataService, order_type, UIService } from 'src/app/core';
import { Observable, takeUntil } from 'rxjs';

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
  chainTypes: Array<string> = Object.keys(chainType);
  orderTypes: Array<string> = Object.keys(order_type); 
  currentFilterForm$!: Observable<any>;

  constructor(private uiservice: UIService, private dataservice: DataService, private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createFilterForm();
    this.bindCurrentQuery();
    this.bindFilterForm();
  }

  createFilterForm() {
    this.filterForm = this.formBuilder.group({
      selectedChainType: [chainType.ethereum, Validators.required],
      selectedOrderBy: [order_type.relevance, Validators.required]
    })
  }

  bindCurrentQuery() {
    const currentQuery = this.uiservice.SearchQuery;
    this.filterForm.patchValue({
      selectedChainType: currentQuery.chain ?? chainType.ethereum,
      selectedOrderBy: currentQuery.order_by ?? order_type.relevance
    });
  }

  bindFilterForm() {
    this.currentFilterForm$ = this.filterForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    );
    this.currentFilterForm$.subscribe(() => {
      const controls = this.filterForm.controls;
      const newAttribute = { 
        chain: controls['selectedChainType'].value,
        order_by: controls['selectedOrderBy'].value
      };
      this.uiservice.updateSearchQuery(newAttribute);
      this.dataservice.reSearchNFT();
    });
  }
}
