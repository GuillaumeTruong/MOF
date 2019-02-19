import { Pipe, PipeTransform } from '@angular/core';
import { Aircraft } from '../../Class/Aircraft';

@Pipe({
    name: 'filtersPipe',
    pure: false
})
export class FiltersPipe implements PipeTransform {
    transform(items: Aircraft[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => {
            let result = true;
            result = result && (filter.State === 'All' || item.state === filter.State);

            if (filter.Online) {
                result = result && item.online;
            }
            if (filter.WOInProgress) {
                result = result && (item.woInProgress !== 'None');
            }

            return result;
    });
    }
}
