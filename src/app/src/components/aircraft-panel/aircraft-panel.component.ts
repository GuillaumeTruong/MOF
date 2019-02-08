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
        { id: 1, name: 'BAAA', family: 'A319', state: AircraftState.TaxiIn, woInProgress: false },
        { id: 2, name: 'DAAA', family: 'A319', state: AircraftState.Flight, woInProgress: true },
        { id: 3, name: 'SAAA', family: 'A319', state: AircraftState.Flight, woInProgress: false },
        { id: 4, name: 'RAAA', family: 'A319', state: AircraftState.ReadyForMaintenance, woInProgress: false }
      ]
    },
    {
      familyName: 'A320',
      aircraftList: [
        { id: 5, name: 'AAAA', family: 'A320', state: AircraftState.Flight, woInProgress: true },
        { id: 6, name: 'ZAAA', family: 'A320', state: AircraftState.TaxiIn, woInProgress: false },
        { id: 7, name: 'EAAA', family: 'A320', state: AircraftState.Flight, woInProgress: false },
        { id: 8, name: 'TAAA', family: 'A320', state: AircraftState.Flight, woInProgress: true },
        { id: 9, name: 'YAAA', family: 'A320', state: AircraftState.TakeOff, woInProgress: true }
      ]
    },
    {
      familyName: 'A321',
      aircraftList: [
        { id: 10, name: 'ASAA', family: 'A321', state: AircraftState.TaxiIn, woInProgress: true },
        { id: 11, name: 'AACA', family: 'A321', state: AircraftState.ReadyForMaintenance, woInProgress: true },
        { id: 12, name: 'AARA', family: 'A321', state: AircraftState.Flight, woInProgress: false },
        { id: 13, name: 'AAXA', family: 'A321', state: AircraftState.Flight, woInProgress: false },
        { id: 14, name: 'AAQA', family: 'A321', state: AircraftState.ReadyForMaintenance, woInProgress: true },
        { id: 15, name: 'AMOA', family: 'A321', state: AircraftState.Flight, woInProgress: false },
        { id: 16, name: 'AAGA', family: 'A321', state: AircraftState.TaxiIn, woInProgress: false }
      ]
    },
    {
      familyName: 'A350',
      aircraftList: [
        { id: 17, name: 'AAMA', family: 'A350', state: AircraftState.ReadyForMaintenance, woInProgress: true },
        { id: 18, name: 'AAAA', family: 'A350', state: AircraftState.Flight, woInProgress: false }
      ]
    },
    {
      familyName: 'A380',
      aircraftList: [
        { id: 19, name: 'AHAA', family: 'A380', state: AircraftState.TakeOff, woInProgress: false },
        { id: 20, name: 'CDAA', family: 'A380', state: AircraftState.Flight, woInProgress: false },
        { id: 21, name: 'POAA', family: 'A380', state: AircraftState.ReadyForMaintenance, woInProgress: true }
      ]
    }
  ];

  searchInputValue: String = '';
  filterOpen: Boolean = false;
  sorterOpen: Boolean = false;
  nbFilter: Number = 0;
  sorter: String = 'Family';
  filterList: any = {
    ReadyForMaintenance: false,
    Flight: false,
    Taxiin: false,
    Online: false,
    WOInProgress: false,
  };

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

  searchAircraft(): void {
    console.log(this.searchInputValue);
  }

  switchFilterOpen(): void {
    this.filterOpen = !this.filterOpen;
  }

  switchSorterOpen(): void {
    this.sorterOpen = !this.sorterOpen;
  }
}
