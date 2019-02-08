import { Pipe, PipeTransform } from '@angular/core';
import { Aircraft, AircraftState } from '../../Class/Aircraft';

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
            if (filter.ReadyForMaintenance) {
                result = result && (item.state === AircraftState.ReadyForMaintenance);
            }
            if (filter.Flight) {
                result = result && (item.state === AircraftState.Flight);
            }
            if (filter.Taxiin) {
                result = result && (item.state === AircraftState.TaxiIn);
            }
            if (filter.Online) {
            }
            if (filter.WOInProgress) {
                result = result && (item.woInProgress);
            }
            return result;
    });
    }
}
