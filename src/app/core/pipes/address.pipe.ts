import { Pipe, PipeTransform } from '@angular/core';
import { ToolsService } from '../services';

@Pipe({name: 'addrCutFromHead'})
export class AddrCutFromHead implements PipeTransform {
  transform(value: string, cutLength: number = 6): string {
    return (typeof value === 'undefined') ? 
        "" : (value.split('x')[1]).substring(0, cutLength);
  }
}

@Pipe({name: 'addrTrimFromCenter'})
export class AddrTrimFromCenter implements PipeTransform {
  transform(value: string, trimLength: number = 10): string {
    return ToolsService.smartTrim(value, trimLength);
  }
}