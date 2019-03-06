import { Pipe, PipeTransform } from '@angular/core';
import {ImportProgress} from '../../Class/ImportProgress';

@Pipe({
  name: 'sortPipeImports',
  pure: false
})
export class SortPipeImports implements PipeTransform {
  transform(items: ImportProgress[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    switch (filter.type) {
      case 'State':
        if (filter.order) {
          return items.sort((a, b) => b.status - a.status);
        } else {
          return items.sort((a, b) => a.status - b.status);
        }
      case 'AC':
        if (filter.order) {
          return items.sort((a, b) => a.acName.localeCompare(b.acName));
        } else {
          return items.sort((a, b) => -a.acName.localeCompare(b.acName));
        }
      case 'WO':
        if (filter.order) {
          return items.sort((a, b) => a.WO.localeCompare(b.WO));
        } else {
          return items.sort((a, b) => -a.WO.localeCompare(b.WO));
        }
      case 'Deadline':
        if (filter.order) {
          return items.sort((a, b) => b.status - a.status);
        } else {
          return items.sort((a, b) => a.status - b.status);
        }
    }
  }
}
