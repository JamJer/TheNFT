import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  ],

})
export class MediaContainerComponent extends BaseComponent implements OnInit {
  @Input() mediaObject!: Media;
  @ViewChild('imageElmt') imageElmt!: ElementRef;
  @ViewChild('videoElmt') videoElmt!: ElementRef;

  private validurl?: string;

  isImage: boolean = false;
  imagePath?: string;
  videoPath?: string;

  isLoading: boolean = true;
  isAutoStart: boolean = false;


  constructor() {
    super();
  }

  ngOnInit(): void {
    const {
      media_url,
      media_cached_url,
      auto_start,
    } = this.mediaObject;

    this.validurl = media_url ?? media_cached_url;
    this.isImage = ToolsService.checkIfImgURL(this.validurl);
    this.isAutoStart = auto_start;
  }

  loaded() {
    this.isLoading = false;
  }

  checkVideoIsLoaded() {
    let count = 0;
    const b = setInterval(()=>{
      if(this.videoElmt.nativeElement.readyState >= 3){
          clearInterval(b);
      }
      count++;
      if(count > 1) {
        this.validurl = this.mediaObject.media_cached_url;
        this.isImage = ToolsService.checkIfImgURL(this.validurl);
        if(this.isImage) {
          this.imagePath = this.validurl;
          clearInterval(b);
          return;
        };
        this.videoPath = this.validurl;
        clearInterval(b);
      }
    },500);
  }

  isInView($event: any) {
    if(this.isImage) {
      this.imagePath = this.validurl;
      return;
    };
    this.videoPath = this.validurl;
    this.checkVideoIsLoaded();
  }
}
