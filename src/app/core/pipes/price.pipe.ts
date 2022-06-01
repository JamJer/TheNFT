import { Pipe, PipeTransform } from '@angular/core';
import { BaseComponent } from '../base';
import { chainType } from '../models';

@Pipe({name: 'priceNFTUnit'})
export class PriceNFTUnit extends BaseComponent implements PipeTransform {
    transform(value: number, coinType: chainType): string {
        return '' + value + this.icons[coinType as keyof typeof this.icons]; 
    }
}