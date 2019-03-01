import { Pipe, PipeTransform } from '@angular/core';
import {ImportProgress} from '../../Class/ImportProgress';

@Pipe({
  name: 'filtersPipeImports',
  pure: false
})
export class FiltersPipeImports implements PipeTransform {
  transform(items: ImportProgress[], filters: any): any {
    if (!items || !filters) {
      return items;
    }
    return items.filter(item => {
      if (filters.lenght === 0) {
        return true;
      }
      for (const filter of filters) {
        const parts = filter.replace(/r/g, '').split(':');
        let res = true;
        if (parts.length === 1) {
          if (item.partNumber.match(new RegExp(parts[0], 'gi')) == null &&
              item.acName.match(new RegExp(parts[0], 'gi')) == null &&
              item.WO.match(new RegExp(parts[0], 'gi')) == null) {
            console.log('false');
            res = false;
          }
        }
        if (parts.length === 2) {
          if (parts[0] === 'PN' && item.partNumber.match(new RegExp(parts[1], 'gi')) == null) {
            res = false;
          }
          if (parts[0] === 'AC' && item.acName.match(new RegExp(parts[1], 'gi')) == null) {
            res = false;
          }
          if (parts[0] === 'WO' && item.WO.match(new RegExp(parts[1], 'gi')) == null) {
            res = false;
          }
        }
        if (!res) {
          return res;
        }
      }
      return true;
    });
  }
}
