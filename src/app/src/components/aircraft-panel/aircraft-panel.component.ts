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
        { id: 1, name: 'BAAA', family: 'A319', state: AircraftState.Arrival, woInProgress: false, online: false },
        { id: 2, name: 'DAAA', family: 'A319', state: AircraftState.Cruise, woInProgress: true, online: false },
        { id: 3, name: 'SAAA', family: 'A319', state: AircraftState.Cruise, woInProgress: false, online: false },
        { id: 4, name: 'RAAA', family: 'A319', state: AircraftState.ReadyForMaintenance, woInProgress: false, online: true }
      ]
    },
    {
      familyName: 'A320',
      aircraftList: [
        { id: 5, name: 'AAAA', family: 'A320', state: AircraftState.Cruise, woInProgress: true, online: true },
        { id: 6, name: 'ZAAA', family: 'A320', state: AircraftState.Arrival, woInProgress: false, online: true },
        { id: 7, name: 'EAAA', family: 'A320', state: AircraftState.Cruise, woInProgress: false, online: false },
        { id: 8, name: 'TAAA', family: 'A320', state: AircraftState.Cruise, woInProgress: true, online: false },
        { id: 9, name: 'YAAA', family: 'A320', state: AircraftState.Parking, woInProgress: true, online: true }
      ]
    },
    {
      familyName: 'A321',
      aircraftList: [
        { id: 10, name: 'ASAA', family: 'A321', state: AircraftState.Arrival, woInProgress: true, online: true },
        { id: 11, name: 'AACA', family: 'A321', state: AircraftState.ReadyForMaintenance, woInProgress: true, online: true },
        { id: 12, name: 'AARA', family: 'A321', state: AircraftState.Cruise, woInProgress: false, online: true },
        { id: 13, name: 'AAXA', family: 'A321', state: AircraftState.Cruise, woInProgress: false, online: false },
        { id: 14, name: 'AAQA', family: 'A321', state: AircraftState.ReadyForMaintenance, woInProgress: true, online: true },
        { id: 15, name: 'AMOA', family: 'A321', state: AircraftState.Cruise, woInProgress: false, online: false },
        { id: 16, name: 'AAGA', family: 'A321', state: AircraftState.Arrival, woInProgress: false, online: false }
      ]
    },
    {
      familyName: 'A350',
      aircraftList: [
        { id: 17, name: 'AAMA', family: 'A350', state: AircraftState.ReadyForMaintenance, woInProgress: true, online: true },
        { id: 18, name: 'AAAA', family: 'A350', state: AircraftState.Cruise, woInProgress: false, online: false }
      ]
    },
    {
      familyName: 'A380',
      aircraftList: [
        { id: 19, name: 'AHAA', family: 'A380', state: AircraftState.Parking, woInProgress: false, online: false },
        { id: 20, name: 'CDAA', family: 'A380', state: AircraftState.Cruise, woInProgress: false, online: false },
        { id: 21, name: 'POAA', family: 'A380', state: AircraftState.ReadyForMaintenance, woInProgress: true, online: true }
      ]
    }
  ];

  searchInputValue: String = '';
  filterOpen: Boolean = false;
  nbFilter: Number = 0;
  sorter: String = 'Family';
  filterList: any = {
    ReadyForMaintenance: false,
    Cruise: false,
    Arrival: false,
    Online: false,
    WOInProgress: false,
  };

  constructor() { }

  ngOnInit() {
  }

  isAircraftArrival(aircraftElement): Boolean {
    return aircraftElement.state === AircraftState.Arrival;
  }

  isAircraftCruise(aircraftElement): Boolean {
    return aircraftElement.state === AircraftState.Cruise;
  }

  isAircraftReadyForMaintenance(aircraftElement): Boolean {
    return aircraftElement.state === AircraftState.ReadyForMaintenance;
  }

  isAircraftParking(aircraftElement): Boolean {
    return aircraftElement.state === AircraftState.Parking;
  }

  searchAircraft(): void {
    console.log(this.searchInputValue);
  }

  switchFilterOpen(): void {
    this.filterOpen = !this.filterOpen;
  }
}
