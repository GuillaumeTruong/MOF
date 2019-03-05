import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
import { TimeManagementService } from './time-management.service';
import data from '../data/AircraftDataBase.json';
import confDB from '../data/configurationDB.json';

@Injectable({
  providedIn: 'root'
})

export class AircraftService {

  private aircraftList = new BehaviorSubject<any>({});

  cast = this.aircraftList.asObservable();
  time = 0;
  isInit = false;

  configurationDB;

  constructor(private timeManagementService: TimeManagementService) {
    this.timeManagementService.cast.subscribe(time => this.timeChange(time));
    this.configurationDB = <any>confDB;
    console.log(this.configurationDB);
    this.editAircraftList(<any>data);
    this.setList();
    // this.setStateAircraft();
    this.setNextFlightIndex();
    this.setStateAircraft();
    this.setOnlineAircraft();
    console.log('Aircraft List init');
    console.log(this.aircraftList);
    this.isInit = true;
  }

  editAircraftList( newAircraftList ) {
    this.aircraftList.next(newAircraftList);
  }

  timeChange(time: number): void {
    this.time = time;
    if (this.isInit) {
      this.setNextFlightIndex();
      this.setStateAircraft();
      this.setOnlineAircraft();
      this.aircraftList.next(this.aircraftList.value);
    }
  }

  setList(): any {
    const aircraftListTmp = [];
    for (const aircraft in (this.aircraftList.value.AircraftList)) {
      if (this.aircraftList.value.AircraftList.hasOwnProperty(aircraft)) {
        const aircraftInfo = this.aircraftList.value.AircraftList[aircraft];

        let familyName = '';
        let configuration;
        switch (aircraftInfo.acType) {
          case 'A318': {
            configuration = this.configurationDB.configurations[0].configuration;
            familyName = 'A320';
            break;
          }
          case 'A319': {
            configuration = this.configurationDB.configurations[1].configuration;
            familyName = 'A320';
            break;
          }
          case 'A320': {
            configuration = this.configurationDB.configurations[2].configuration;
            familyName = 'A320';
            break;
          }
          case 'A321': {
            configuration = this.configurationDB.configurations[3].configuration;
            familyName = 'A320';
            break;
          }
          case 'A330-200': {
            configuration = this.configurationDB.configurations[4].configuration;
            familyName = 'A330 / A340';
            break;
          }
          case 'A340-300': {
            configuration = this.configurationDB.configurations[5].configuration;
            familyName = 'A330 / A340';
            break;
          }
          case 'A380-800': {
            configuration = this.configurationDB.configurations[6].configuration;
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
          configuration: configuration,
          nextOrCurrentFlightIndex: 0
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
  setNextFlightIndex(): void {
    for (const aircraft of (this.aircraftList.value.AircraftList)) {
      let index = 0;
      while (aircraft.flightsList.length > index && this.time > aircraft.flightsList[index].timeArr) {
        index++;
      }
      aircraft.nextOrCurrentFlightIndex = index;
    }
  }

  // TODO
  setStateAircraft(): any {
    for (const aircraft of (this.aircraftList.value.AircraftList)) {
      if ( aircraft.nextOrCurrentFlightIndex > 0 ) {
        aircraft.state = this.stateFromTime(aircraft.flightsList[aircraft.nextOrCurrentFlightIndex - 1].timeArr,
          aircraft.flightsList[aircraft.nextOrCurrentFlightIndex].timeDep);
      } else {
        aircraft.state = this.stateFromTime(-1, aircraft.flightsList[aircraft.nextOrCurrentFlightIndex].timeDep);
      }
    }
  }

  stateFromTime(ArrDate, depDate: number): string {
    if ( ArrDate !== -1 ) {
      // arrivé depuis moins de 10 minutes
      if ( this.time < ArrDate + 600000 ) {
        return 'Arrival';
      }
      // départ dans plus de 10 minutes
      if ( this.time <= depDate - 600000 ) {
        return 'Ready For Maintenance';
      }
      if ( this.time < depDate ) {
        return 'Parking';
      }
      if ( this.time >= depDate ) {
        return 'Cruise';
      }
    } else {

      if ( this.time < depDate - 600000 ) {
        return 'Ready For Maintenance';
      }
      // départ dans plus de 10 minutes
      if ( this.time < depDate ) {
        return 'Parking';
      }
      if ( this.time >= depDate ) {
        return 'Cruise';
      }
    }
    return 'None';
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
      if (aircraft.state === 'Cruise' && Math.floor(Math.random() * Math.floor(100)) > 10) {
        aircraft.online = false;
      } else {
        aircraft.online = true;
      }
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

  findAircraftByName(name: string): any {
    for (const aircraft of (this.aircraftList.value.AircraftList)) {
      if (aircraft.name === name) {
        return aircraft;
      }
    }
  }

}
