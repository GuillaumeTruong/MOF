import { Pipe, PipeTransform } from '@angular/core';
import {ImportProgress} from '../../Class/ImportProgress';

@Pipe({
  name: 'filterPipeImports',
  pure: false
})
export class FilterPipeImports implements PipeTransform {
  transform(items: ImportProgress[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => {
      switch (filter) {
        case 'All':
          return true;
        case 'Error':
          return item.status === 4;
        case 'Warning':
          return item.status === 2 || item.status === 3;
        case 'Finished':
          return item.status === 1;
      }
    });
  }
}
