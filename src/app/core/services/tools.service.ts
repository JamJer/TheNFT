import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  checkIfImgURL(url: string) {
      return(url.match(/\.(jpeg|jpg|jfif|pjpeg|gif|pjp|png|svg|apng|webp|avif|)$/) != null);
  }
}
