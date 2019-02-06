import { Component, OnInit } from '@angular/core';
import { Aircraft, AircraftState } from '../../Class/Aircraft';
import { AircraftFamily } from '../../Class/AircraftFamily';

@Component({
  selector: 'app-aircraft-panel',
  templateUrl: './aircraft-panel.component.html',
  styleUrls: ['./aircraft-panel.component.scss']
})
export class AircraftPanelComponent implements OnInit {

  aircraftList: AircraftFamily[] = [
    {
      familyName: 'A319',
      aircraftList: [
        { id: 1, name: 'F-BAAA', family: 'A319', state: AircraftState.TaxiIn, woInProgress: false },
        { id: 2, name: 'F-DAAA', family: 'A319', state: AircraftState.Flight, woInProgress: true },
        { id: 3, name: 'F-SAAA', family: 'A319', state: AircraftState.Flight, woInProgress: false },
        { id: 4, name: 'F-RAAA', family: 'A319', state: AircraftState.ReadyForMaintenance, woInProgress: false }
      ]
    },
    {
      familyName: 'A320',
      aircraftList: [
        { id: 5, name: 'F-AAAA', family: 'A320', state: AircraftState.Flight, woInProgress: true },
        { id: 6, name: 'F-ZAAA', family: 'A320', state: AircraftState.TaxiIn, woInProgress: false },
        { id: 7, name: 'F-EAAA', family: 'A320', state: AircraftState.Flight, woInProgress: false },
        { id: 8, name: 'F-TAAA', family: 'A320', state: AircraftState.Flight, woInProgress: true },
        { id: 9, name: 'F-YAAA', family: 'A320', state: AircraftState.TakeOff, woInProgress: true }
      ]
    },
    {
      familyName: 'A321',
      aircraftList: [
        { id: 10, name: 'F-ASAA', family: 'A321', state: AircraftState.TaxiIn, woInProgress: true },
        { id: 11, name: 'F-AACA', family: 'A321', state: AircraftState.ReadyForMaintenance, woInProgress: true },
        { id: 12, name: 'F-AARA', family: 'A321', state: AircraftState.Flight, woInProgress: false },
        { id: 13, name: 'F-AAXA', family: 'A321', state: AircraftState.Flight, woInProgress: false },
        { id: 14, name: 'F-AAQA', family: 'A321', state: AircraftState.ReadyForMaintenance, woInProgress: true },
        { id: 15, name: 'F-AMOA', family: 'A321', state: AircraftState.Flight, woInProgress: false },
        { id: 16, name: 'F-AAGA', family: 'A321', state: AircraftState.TaxiIn, woInProgress: false }
      ]
    },
    {
      familyName: 'A350',
      aircraftList: [
        { id: 17, name: 'F-AAMA', family: 'A350', state: AircraftState.ReadyForMaintenance, woInProgress: true },
        { id: 18, name: 'F-AAAA', family: 'A350', state: AircraftState.Flight, woInProgress: false }
      ]
    },
    {
      familyName: 'A380',
      aircraftList: [
        { id: 19, name: 'F-AHAA', family: 'A380', state: AircraftState.TakeOff, woInProgress: false },
        { id: 20, name: 'F-CDAA', family: 'A380', state: AircraftState.Flight, woInProgress: false },
        { id: 21, name: 'F-POAA', family: 'A380', state: AircraftState.ReadyForMaintenance, woInProgress: true }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  isAircraftTaxiIn(aircraftElement): Boolean {
    return aircraftElement.state === AircraftState.TaxiIn;
  }

  isAircraftFlight(aircraftElement): Boolean {
    return aircraftElement.state === AircraftState.Flight;
  }

  isAircraftReadyForMaintenance(aircraftElement): Boolean {
    return aircraftElement.state === AircraftState.ReadyForMaintenance;
  }

  isAircraftTakeOff(aircraftElement): Boolean {
    return aircraftElement.state === AircraftState.TakeOff;
  }

}
