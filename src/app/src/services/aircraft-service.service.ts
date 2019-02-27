import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
import data from '../data/Aircraft.json';

@Injectable({
  providedIn: 'root'
})

export class AircraftService {

  private aircraftList = new BehaviorSubject<any>({});

  cast = this.aircraftList.asObservable();

  constructor() {
    this.editAircraftList(<any>data);
    console.log('List from json');
    console.log(this.aircraftList);
  }

  editAircraftList( newAircraftList ) {
    this.aircraftList.next(newAircraftList);
  }

  getAircraftByFamily(): any {
    const aircraftByFamily = [];
    let added = false;

    for (const aircraft of (this.aircraftList.value.AircraftList)) {

      added = false;

      for (const family of aircraftByFamily) {
        if (family.sortedName === aircraft.family) {
          family.aircraftList.push(aircraft);
          added = true;
        }
      }

      if (!added) {
        const tmpAircraftFamily = {
          sortedName: aircraft.family,
          aircraftList: [ aircraft ]
        };
        aircraftByFamily.push(tmpAircraftFamily);
      }
    }

    console.log('aircraft List by family');
    console.log(aircraftByFamily);
    return aircraftByFamily;
  }

  getAircraftByState(): any {
    const aircraftByState = [];
    let added = false;

    for (const aircraft of (this.aircraftList.value.AircraftList)) {

      added = false;

      for (const state of aircraftByState) {
        if (state.sortedName === aircraft.state) {
          state.aircraftList.push(aircraft);
          added = true;
        }
      }

      if (!added) {
        const tmpAircraftState = {
          sortedName: aircraft.state,
          aircraftList: [ aircraft ]
        };
        aircraftByState.push(tmpAircraftState);
      }
    }

    console.log('aircraft List by State');
    console.log(aircraftByState);
    return aircraftByState;
  }

  getAircraftByWO(): any {
    const aircraftByWO = [];
    let added = false;

    for (const aircraft of (this.aircraftList.value.AircraftList)) {

      added = false;

      for (const wo of aircraftByWO) {
        if (wo.sortedName === aircraft.woInProgress) {
          wo.aircraftList.push(aircraft);
          added = true;
        }
      }

      if (!added) {
        const tmpAircraftWO = {
          sortedName: aircraft.woInProgress,
          aircraftList: [ aircraft ]
        };
        aircraftByWO.push(tmpAircraftWO);
      }
    }

    console.log('aircraft List by WO');
    console.log(aircraftByWO);
    return aircraftByWO;
  }

}
