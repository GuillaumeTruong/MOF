import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
import data from '../data/Workorder.json';

@Injectable({
  providedIn: 'root'
})
export class WorkorderService {

  private woList = new BehaviorSubject<any>({});

  cast = this.woList.asObservable();

  constructor() {
    this.editAircraftList(<any>data);
    console.log('WO List from json');
    console.log(this.woList);
  }

  editAircraftList( newWoList ) {
    this.woList.next(newWoList);
  }

  findWoByNumber( woNumber ): any {
    for (const wo of (this.woList.value.WorkorderList)) {
      if (wo.woNumber === woNumber) {
        return wo;
      }
    }
  }

  deadLineToString( workOrder ): string {
    const date = new Date(workOrder.deadline);

    const year = date.getFullYear() + '';
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    let result = '';

    result = (day < 10) ? result + '0' + day : result + day;
    result = result + '/';
    result = (month < 10) ? result + '0' + month : result + month;
    result = result + '/';
    result = result + year.slice(-2);
    result = result + ', ';
    result = (hour <= 12) ? result + hour : result + (hour - 12);
    if (minute > 0) {
      result = (minute < 10) ? result + ':0' + minute : result + ':' + minute;
    }
    result = (hour <= 12) ? result + 'am' : result + 'pm';

    return result;
  }
}
