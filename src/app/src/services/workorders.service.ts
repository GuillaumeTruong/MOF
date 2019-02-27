import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {WorkOrders} from '../Class/WorkOrders';
import data from '../data/Workorders.json';

@Injectable({
  providedIn: 'root'
})
export class WorkordersService {

  private workordersList = new BehaviorSubject<any>({});

  constructor() {
    this.editworkordersList(<any>data);
    console.log('WorkOrdersList from json');
    console.log(this.workordersList);
  }

  editworkordersList( newWorkordersList ) {
    this.workordersList.next(newWorkordersList);
  }

  getWorkorders(): WorkOrders[] {
    const workorders: WorkOrders[] = [];
    for (const i of (this.workordersList.value.workordersList)) {
      const tmpWorkorders = {
        woId: i.woId,
        deadLine: i.deadLine,
        nbAc: i.nbAc,
        operation: i.operation,
      };
      workorders.push(tmpWorkorders);
    }
    return workorders;
  }
}
