import { Pipe, PipeTransform } from '@angular/core';
import {UploadProgress} from '../../Class/UploadProgress';

@Pipe({
  name: 'filtersPipeUpload',
  pure: false
})
export class FiltersPipeUpload implements PipeTransform {
  transform(items: UploadProgress[], filters: any): any {
    if (!items || !filters) {
      return items;
    }
    return items.filter(item => {
      if (filters.lenght === 0) {
        return true;
      }
      for (const filter of filters) {
        const parts = filter.replace(/r/g, '').split(':');
        let res = false;
        if (parts.length === 1) {
          if (item.acName.match(new RegExp(parts[0], 'gi')) != null ||
              item.WO.match(new RegExp(parts[0], 'gi')) != null) {
            res = true;
          }
          for (const pn of item.partNumbers) {
            res = pn.match(new RegExp(parts[0], 'gi')) != null ? true : res;
          }
          for (const fin of item.FINs) {
            res = fin.match(new RegExp(parts[0], 'gi')) != null ? true : res;
          }
        }
        if (parts.length === 2) {
          if (parts[0] === 'PN') {
            for (const pn of item.partNumbers) {
              res = pn.match(new RegExp(parts[0], 'gi')) != null ? true : res;
            }
          }
          if (parts[0] === 'FIN') {
            for (const fin of item.FINs) {
              res = fin.match(new RegExp(parts[0], 'gi')) != null ? true : res;
            }
          }
          if (parts[0] === 'AC' && item.acName.match(new RegExp(parts[1], 'gi')) != null) {
            res = true;
          }
          if (parts[0] === 'WO' && item.WO.match(new RegExp(parts[1], 'gi')) != null) {
            res = true;
          }
        }
        if (!res) {
          return false;
        }
      }
      return true;
    });
  }
}
