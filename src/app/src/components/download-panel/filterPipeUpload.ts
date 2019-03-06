import { Pipe, PipeTransform } from '@angular/core';
import {UploadProgress} from '../../Class/UploadProgress';

@Pipe({
  name: 'filterPipeUpload',
  pure: false
})
export class FilterPipeUpload implements PipeTransform {
  transform(items: UploadProgress[], filter: any): any {
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
          return item.status === 3;
        case 'Finished':
          return item.status === 2;
      }
    });
  }
}
