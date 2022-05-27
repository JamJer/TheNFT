import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent, Media, ToolsService } from 'src/app/core';
import { Fade, ScaleFade, ScaleFadeStagger } from 'src/app/shared/animations';

@Component({
  selector: 'app-media-container',
  templateUrl: './media-container.component.html',
  styleUrls: ['./media-container.component.scss'],
  animations: [
    ScaleFade,
    ScaleFadeStagger,
    Fade
  ]
})
export class MediaContainerComponent extends BaseComponent implements OnInit {
  @Input()
  mediaObject!: Media;

  isImage: boolean = false;
  isLoading: boolean = true;
  isAutoStart: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.isImage = ToolsService.checkIfImgURL(this.mediaObject.media_url ?? this.mediaObject.media_cached_url);
    this.isAutoStart = this.mediaObject.auto_start;
  }

  loaded() {
    this.isLoading = false;
  }
}
