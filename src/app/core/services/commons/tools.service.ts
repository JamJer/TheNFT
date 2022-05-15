import { Injectable } from '@angular/core';
import { NFTCard } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  static checkIfImgURL(url: string) {
      return(url.match(/\.(jpeg|jpg|jfif|pjpeg|gif|pjp|png|svg|apng|webp|avif|)$/) != null);
  }
  
  static filterInvalidNFT(toFilter: NFTCard[]) {
    return toFilter.filter(item => 
      ((item.cached_file_url !== "") && 
       (item.cached_file_url.indexOf('octet-stream') == -1)));
  }

  static convertToObject(query: any): Record<string,string> {
    let result: Record<string,string> = {};
    Object.entries(query).map(([key, value]) => {
      result[key] = String(value)
    });
    return result;
  }
}
