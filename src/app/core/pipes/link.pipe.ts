import { Pipe, PipeTransform } from '@angular/core';
import { environment as env } from 'src/environments/environment.prod';

@Pipe({name: 'linkNFTAddr'})
export class LinkNFTAddr implements PipeTransform {
  transform(value: string): string {
    return (typeof value === 'undefined') ? 
        "javascript:void(0)" : (env.EtherscanUrl + value);
  }
}