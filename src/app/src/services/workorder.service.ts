import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';
import { AircraftService } from './aircraft-service.service';
import { TimeManagementService } from './time-management.service';
import dataWO from '../data/Workorder.json';
import dataConfig from '../data/configurationDB.json';
import { Aircraft } from '../Class/Aircraft';

@Injectable({
  providedIn: 'root'
})
export class WorkorderService {

  private woList = new BehaviorSubject<any>({});

  cast = this.woList.asObservable();

  aircraftList;
  currentTime: number;
  configurationList;

  constructor(
    private aircraftService: AircraftService,
    private timeManagementService: TimeManagementService
  ) {
    this.timeManagementService.cast.subscribe(time => this.timeChange(time));
    this.aircraftService.cast.subscribe(aircraft => this.AircraftChange(aircraft));
    this.configurationList = <any>dataConfig;

    this.generatorWoList(30);
    this.addWoFromJson();
    console.log(this.woList.value);

    // this.editWorkOrderList(<any>data);
    console.log('WO List from json');
    console.log(this.woList);
  }

  timeChange(time): void {
    this.currentTime = time;
  }

  AircraftChange(aircraft): void {
    this.aircraftList = aircraft.AircraftList;
  }

  editWorkOrderList( newWoList ) {
    this.woList.next(newWoList);
  }

  generatorWoList( nbWoGenerated ): void {
    const woList = [];
    const acList = this.aircraftService.getAircraftList();

    for (const ac of acList.AircraftList) {
      ac.woInProgress = [];
    }

    for (let n = 0; n < nbWoGenerated; n++) {

      const woNumber = Math.floor(Math.random() * Math.floor(9000000)) + 999999;
      // 864000000 = 10 jours
      const deadline = Math.floor(Math.random() * Math.floor(864000000)) + this.currentTime + 864000000;


      // generate pn list
      const pn = [];
      const nbPnMax = Math.floor(Math.random() * Math.floor(3)) + 1;
      const acType = Math.floor(Math.random() * Math.floor(7));

      for (let nbPn = 0; nbPn < nbPnMax; nbPn++) {

        const hdIndex = Math.floor(Math.random() * Math.floor(this.configurationList.configurations[acType].configuration.length));

        const swIndex = Math.floor(Math.random() *
          Math.floor(this.configurationList.configurations[acType].configuration[hdIndex].soft.length));

        const tmp = {
          oldPN: this.configurationList.configurations[acType].configuration[hdIndex].soft[swIndex].pn,
          newPN: this.generateID(),
          fileSize: Math.floor(Math.random() * Math.floor(300)) + 150,
          finSW: this.configurationList.configurations[acType].configuration[hdIndex].soft[swIndex].fin,
          fdSW: this.configurationList.configurations[acType].configuration[hdIndex].soft[swIndex].fd,
          finHW: this.configurationList.configurations[acType].configuration[hdIndex].fin,
          fdHW: this.configurationList.configurations[acType].configuration[hdIndex].fd
        };
        pn.push(tmp);
      }

      // generate aicraft list
      const aircraft = [];
      const acTypeList = ['A318', 'A319', 'A320', 'A321', 'A330-200', 'A340-300', 'A380-800'];
      const nbAircraftMax = Math.floor(Math.random() * Math.floor(5)) + 1;
      const aircraftIndexList = [];
      let indexTmp = 0;

      for (let nbAircraft = 0; nbAircraft < nbAircraftMax; nbAircraft++) {
        let added = false;
        while (!added) {
          if (this.aircraftList[indexTmp].acType === acTypeList[acType] &&  Math.floor(Math.random() * Math.floor(2)) === 1
            && !aircraftIndexList.includes(indexTmp)) {
              aircraftIndexList.push(indexTmp);
              added = true;
          }
          if (indexTmp < this.aircraftList.length - 1) {
            indexTmp++;
          } else {
            indexTmp = 0;
          }
        }
      }

      for (let nbAircraft = 0; nbAircraft < nbAircraftMax; nbAircraft++) {
        const tmp = {
          name: this.aircraftList[aircraftIndexList[nbAircraft]].name,
          currentStep: 'Prepare',
          uploadDate: null,
          uploadEnd: null,
          progress: null,
          time: null,
          connexion: null,
          status: 0,
        };
        aircraft.push(tmp);

        acList.AircraftList[aircraftIndexList[nbAircraft]].woInProgress.push('' + woNumber);
      }

      const tmpwo = {
        woNumber: '' + woNumber,
        deadline: deadline,
        pn: pn,
        aircraftList: aircraft,
        type: Math.floor(Math.random() * Math.floor(4))
      };

      woList.push(tmpwo);
    }
    this.editWorkOrderList(woList);
    this.aircraftService.editAircraftList(acList);
  }

  addWoFromJson() {
    const woListToAdd = <any>dataWO;
    for ( const wo of woListToAdd.WorkorderList ) {
      this.addWOtoList( wo );
    }
  }

  addWOtoList( wo ): void {
    const acList = this.aircraftService.getAircraftList();
    const currentWoList = this.woList.value;

    currentWoList.push(wo);

    for ( const a of wo.aircraftList ) {
      for ( const aircraft of acList.AircraftList ) {
        if (aircraft.name === a.name) {
          aircraft.woInProgress.push('' + wo.woNumber);
          break;
        }
      }
    }

    this.editWorkOrderList(currentWoList);
    this.aircraftService.editAircraftList(acList);
  }

  generateID(): any {
    return 'AAA' + Math.random().toString(36).substr(2, 9).toUpperCase() + Math.random().toString(36).substr(2, 2).toUpperCase();
  }

  findWoByNumber( woNumber ): any {
    for (const wo of (this.woList.value)) {
      if (wo.woNumber === woNumber) {
        return wo;
      }
    }
    return null;
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
    // result = (hour <= 12) ? result + hour : result + (hour - 12);
    // if (minute > 0) {
    //   result = (minute < 10) ? result + ':0' + minute : result + ':' + minute;
    // }
    // result = result + hour;
    result = (hour < 10) ? result + '0' + hour : result + hour;
    result = (minute < 10) ? result + ':0' + minute : result + ':' + minute;
    // result = (hour <= 12) ? result + 'am' : result + 'pm';

    return result;
  }
}
