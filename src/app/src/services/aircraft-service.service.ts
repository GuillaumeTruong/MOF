import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
import { TimeManagementService } from './time-management.service';
import data from '../data/AircraftDataBase.json';

@Injectable({
  providedIn: 'root'
})

export class AircraftService {

  private aircraftList = new BehaviorSubject<any>({});

  cast = this.aircraftList.asObservable();

  constructor(private timeManagementService: TimeManagementService) {
    this.editAircraftList(<any>data);
    console.log('Aircraft List from json');
    console.log(this.aircraftList);
    this.setList();
    // this.setStateAircraft();
    this.timeManagementService.cast.subscribe(time => this.timeChange(time));
  }

  editAircraftList( newAircraftList ) {
    this.aircraftList.next(newAircraftList);
  }

  timeChange(time: number): void {
  }

  setList(): any {
    const aircraftListTmp = [];
    for (const aircraft in (this.aircraftList.value.AircraftList)) {
      if (this.aircraftList.value.AircraftList.hasOwnProperty(aircraft)) {
        const aircraftInfo = this.aircraftList.value.AircraftList[aircraft];

        let familyName = '';
        switch (aircraftInfo.acType) {
          case 'A318':
          case 'A319':
          case 'A320':
          case 'A321': {
            familyName = 'A320';
            break;
          }
          case 'A330-200':
          case 'A340-300': {
            familyName = 'A330 / A340';
            break;
          }
          case 'A380-800': {
            familyName = 'A380';
            break;
          }
        }

        const aicraftTmp = {
          name: aircraftInfo.registration,
          acType: aircraftInfo.acType,
          family: familyName,
          state: 'Ready For Maintenance',
          woInProgress: [],
          online: true,
          maintenancesList: [],
          flightsList: aircraftInfo.flightsList,
          configuration: []
        };
        aircraftListTmp.push(aicraftTmp);
      }
    }
    const list = {
      company: 'Air France',
      AircraftList: aircraftListTmp
    };
    this.editAircraftList(list);
  }

  // TODO
  setStateAircraft(): any {
    for (const aircraft of (this.aircraftList.value.AircraftList)) {
      aircraft.state = 'Ready For Maintenance';
    }
  }

  // TODO
  setWoInProgressAircraft(): any {
    for (const aircraft of (this.aircraftList.value.AircraftList)) {
      aircraft.woInProgress = ['None'];
    }
  }

  // TODO
  setOnlineAircraft(): any {
    for (const aircraft of (this.aircraftList.value.AircraftList)) {
      aircraft.online = true;
    }
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
    let listNameToAdd = [];

    aircraftByWO.push({
      sortedName: 'None',
      aircraftList: []
    });

    for (const aircraft of (this.aircraftList.value.AircraftList)) {

      added = false;
      listNameToAdd = [];
      if (aircraft.woInProgress.length <= 0) {
        aircraftByWO[0].aircraftList.push(aircraft);
        added = true;
      } else {
        for (const woName of aircraft.woInProgress) {
          for (const wo of aircraftByWO) {
            if (wo.sortedName === woName) {
              added = true;
              wo.aircraftList.push(aircraft);
            }
          }
          if (!added) {
            listNameToAdd.push(woName);
          }
        }
      }

      for (const newWo of listNameToAdd) {
        const tmpAircraftWO = {
          sortedName: newWo,
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
