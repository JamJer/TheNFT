import { Component, Input, OnInit } from '@angular/core';
import { FadeFromRight } from 'src/app/shared/animations';

@Component({
  selector: 'app-container-gallery-hover',
  templateUrl: './container-gallery-hover.component.html',
  styleUrls: ['./container-gallery-hover.component.scss'],
  animations: [
    FadeFromRight,
  ],
})
export class ContainerGalleryHoverComponent implements OnInit {
  @Input()
  galleryArray!: any[];

  constructor() { }

  ngOnInit(): void {
  }
}
