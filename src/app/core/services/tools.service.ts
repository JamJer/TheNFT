import { Injectable } from '@angular/core';
import { NFTPreview } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  checkIfImgURL(url: string) {
      return(url.match(/\.(jpeg|jpg|jfif|pjpeg|gif|pjp|png|svg|apng|webp|avif|)$/) != null);
  }

  checkIfVideoURL(url: string) {

  }
  
  filterInvalidNFT(toFilter: NFTPreview[]) {
    return toFilter.filter(item => 
      ((item.cached_file_url !== "") && 
       (item.cached_file_url.indexOf('octet-stream') == -1)));
  }
}
