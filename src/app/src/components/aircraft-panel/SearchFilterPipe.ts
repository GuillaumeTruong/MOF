import { Pipe, PipeTransform } from '@angular/core';
import { Aircraft } from '../../Class/Aircraft';

@Pipe({
    name: 'searchFilterPipe',
    pure: false
})
export class SearchFilterPipe implements PipeTransform {
    transform(items: Aircraft[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        filter = filter.toUpperCase();
        return items.filter(item => item.name.indexOf(filter) !== -1);
    }
}
