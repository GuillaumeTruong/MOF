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
}
