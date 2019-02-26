import { Component, OnInit } from '@angular/core';
import { Aircraft } from '../../Class/Aircraft';
import { AircraftFamily } from '../../Class/AircraftFamily';

import { AircraftService } from '../../services/aircraft-service.service';

@Component({
  selector: 'app-aircraft-panel',
  templateUrl: './aircraft-panel.component.html',
  styleUrls: ['./aircraft-panel.component.scss']
})
export class AircraftPanelComponent implements OnInit {

  searchInputValue: String = '';
  filterOpen: Boolean = false;
  nbFilter: Number = 0;
  sorter: String = 'Family';
  filterList: any = {
    State: 'All',
    Online: false,
    WOInProgress: false,
  };

  aircraftList: any;
  aircraftListSorted: any;

  constructor( private aircraftService: AircraftService ) {
    aircraftService.getAircraftByFamily();
  }

  ngOnInit() {
    this.aircraftService.cast.subscribe(aircraftList => this.onAircraftListChange(aircraftList));
  }


  onAircraftListChange(aircraftList) {
    switch (this.sorter) {
      case 'Family': {
        this.aircraftListSorted = this.aircraftService.getAircraftByFamily();
        break;
      }
      case 'WorkOrder': {
        break;
      }
      case 'State': {
        this.aircraftListSorted = this.aircraftService.getAircraftByState();
        break;
      }
    }
  }

  isAircraftArrival(aircraftElement): Boolean {
    return aircraftElement.state === 'Arrival';
  }

  isAircraftCruise(aircraftElement): Boolean {
    return aircraftElement.state === 'Cruise';
  }

  isAircraftReadyForMaintenance(aircraftElement): Boolean {
    return aircraftElement.state === 'Ready For Maintenance';
  }

  isAircraftParking(aircraftElement): Boolean {
    return aircraftElement.state === 'Parking';
  }

  isAircraftWoInProgress(aircraftElement): Boolean {
    return aircraftElement.woInProgress !== 'None';
  }

  switchFilterOpen(): void {
    this.filterOpen = !this.filterOpen;
    console.log(this.aircraftListSorted);
  }

  sorterChange(event): void {
    switch (this.sorter) {
      case 'Family': {
        this.aircraftListSorted = this.aircraftService.getAircraftByFamily();
        break;
      }
      case 'WorkOrder': {
        this.aircraftListSorted = this.aircraftService.getAircraftByWO();
        break;
      }
      case 'State': {
        this.aircraftListSorted = this.aircraftService.getAircraftByState();
        break;
      }
    }
  }

  isListExpanded(sortedheader): boolean {
    if (sortedheader.expanded === undefined) {
      sortedheader.expanded = true;
    }
    return sortedheader.expanded;
  }

  switchListExpand(sortedheader): void {
    if (sortedheader.expanded !== undefined && sortedheader.expanded !== null) {
      sortedheader.expanded = !sortedheader.expanded;
    }
  }
}
