import { Pipe, PipeTransform } from '@angular/core';
import {UploadProgress} from '../../Class/UploadProgress';

@Pipe({
  name: 'sortPipeUpload',
  pure: false
})
export class SortPipeUpload implements PipeTransform {
  transform(items: UploadProgress[], filter: any): any {
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
