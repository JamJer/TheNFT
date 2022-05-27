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

  static updatePartialObject<T>(obj: T, updates: Partial<T>): T {
    return {...obj, ...updates};
  }

  static convertVariableNameToString(obj: any): string {
    return Object.keys(obj)[0];
  }

  static smartTrim(str: string, maxLen: number): string {
    if (!str) return str;
    if (maxLen < 1) return str;
    if (str.length <= maxLen) return str;
    if (maxLen == 1) return str.substring(0,1) + '...';

    const midpoint = Math.ceil(str.length / 2);
    const toremove = str.length - maxLen;
    const lstrip = Math.ceil(toremove/2);
    const rstrip = toremove - lstrip;
    
    return str.substring(0, midpoint-lstrip) + '...' 
    + str.substring(midpoint+rstrip);
  }
}
