import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { WorkorderService } from '../../services/workorder.service';
import { AircraftService } from '../../services/aircraft-service.service';
import { TimeManagementService } from '../../services/time-management.service';

@Component({
  selector: 'app-workorder-details',
  templateUrl: './workorder-details.component.html',
  styleUrls: ['./workorder-details.component.scss']
})
export class WorkorderDetailsComponent implements OnInit {

  workOrder;
  deadline: string;
  stepper: number;
  stepList = [{
    name: 'Prepare',
    completed: false
  },
  {
    name: 'Import',
    completed: false
  },
  {
    name: 'Upload',
    completed: false
  },
  {
    name: 'Verify',
    completed: false
  },
  {
    name: 'Validate',
    completed: false
  }];
  selectedStep = 'Prepare';

  monthList: any[] = [
    {
      month: 'January',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    }, {
      month: 'February',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false
      ]
    }, {
      month: 'March',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    }, {
      month: 'April',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false
      ]
    }, {
      month: 'May',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    }, {
      month: 'June',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false
      ]
    }, {
      month: 'July',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    }, {
      month: 'August',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    }, {
      month: 'September',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false
      ]
    }, {
      month: 'October',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    }, {
      month: 'November',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false
      ]
    }, {
      month: 'December',
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    }
  ];
  selectedMonthIndex = 0;
  yearSelected = 2019;

  currentTime: number;

  isMouseDown = false;
  firstDaySelected;
  lastDaySelected;
  monthSelectedArea;

  planningAreaListsInSelectedArea;

  constructor(
    private aircraftService: AircraftService,
    private route: ActivatedRoute,
    private workorderService: WorkorderService,
    private timeManagementService: TimeManagementService,
    private router: Router
  ) {
    this.getWo();
  }

  ngOnInit() {
    this.workorderService.cast.subscribe(workorderList => this.onWorkorderListChange(workorderList));
    this.timeManagementService.cast.subscribe(time => this.timeChange(time));
    this.router.events.subscribe( (event: Event) => {
        if (event instanceof NavigationEnd) {
          this.getWo();
          this.initDayList();
          this.autoSelectedDate();
        }
    });
    this.getWo();
    this.initDayList();
    this.autoSelectedDate();
  }

  onWorkorderListChange (workorderList): void {
    this.getWo();
  }

  timeChange(time): void {
    this.currentTime = time;
  }

  getWo(): void {
    const wonumber = this.route.snapshot.paramMap.get('wonumber');
    this.workOrder = this.workorderService.findWoByNumber(wonumber);
    console.log('workorder open');
    console.log(this.workOrder);
    this.deadline = this.workorderService.deadLineToString( this.workOrder );

  }

  setSelectedStep(step) {
    this.selectedStep = step;
  }

  isSelectedStepPrepare() {
    return this.selectedStep === 'Prepare';
  }

  previousMonth (): void {
    if (this.selectedMonthIndex - 1 >= 0) {
      this.selectedMonthIndex--;
    } else {
      this.selectedMonthIndex = 11;
      this.yearSelected--;
    }
  }

  nextMonth (): void {
    if (this.selectedMonthIndex + 1 <= 11) {
      this.selectedMonthIndex++;
    } else {
      this.selectedMonthIndex = 0;
      this.yearSelected++;
    }
  }

  initDayList(): void {
    for (let i = 0; i < this.monthList.length; i++) {
      const tmp = [];
      let nb = 1;
      for (const day of this.monthList[i].daySelected) {
        tmp.push({ day : nb, selected: false });
        nb++;
      }
      this.monthList[i].daySelected = tmp;
    }
  }

  isCurrentDate (i): boolean {
    const date = new Date(this.currentTime);

    if (date.getMonth() !== this.selectedMonthIndex) {
      return false;
    }

    if (date.getDate() !== i) {
      return false;
    }

    return true;
  }

  isDayOld (i): boolean {
    const date = new Date(this.currentTime);

    if (this.yearSelected < 2019) {
      return true;
    }

    if (date.getMonth() > this.selectedMonthIndex) {
      return true;
    }

    if (date.getDate() > i) {
      return true;
    }

    return false;
  }

  isDayLate (i): boolean {
    const date = new Date(this.workOrder.deadline);

    if (this.yearSelected > 2019) {
      return true;
    }

    if (this.yearSelected < 2019) {
      return false;
    }

    if (date.getMonth() < this.selectedMonthIndex) {
      return true;
    }

    if (date.getDate() < i) {
      return true;
    }

    return false;
  }

  selectDay (dayselected): void {
    for (let i = 0; i < this.monthList.length; i++) {
      for (const day of this.monthList[i].daySelected) {
        day.selected = false;
      }
    }
    dayselected.selected = true;
    this.monthSelectedArea = this.selectedMonthIndex;
    this.setPlanningAreaListsInSelectedArea();
  }

  mouseDownHandler(dayselected): void {
    this.isMouseDown = true;
    this.firstDaySelected = dayselected;
  }

  mouseUpHandler(dayselected): void {
    this.isMouseDown = false;
    this.lastDaySelected = dayselected;
    this.setSeclectedArea();
  }

  mouseEnterHandler(dayselected): void {
    if (this.isMouseDown) {
      this.lastDaySelected = dayselected;
      this.setSeclectedArea();
    }
  }

  setSeclectedArea(): void {
    for (const d of this.monthList[this.selectedMonthIndex].daySelected) {
      if (d.day >= this.firstDaySelected.day && d.day <= this.lastDaySelected.day ) {
        d.selected = true;
      } else {
        d.selected = false;
      }
    }
    this.monthSelectedArea = this.selectedMonthIndex;
    this.setPlanningAreaListsInSelectedArea();
  }

  autoSelectedDate(): void {
    this.monthList[this.selectedMonthIndex].daySelected[10].selected = true;
    this.firstDaySelected = { day : 11, selected: true };
    this.lastDaySelected = { day : 11, selected: true };
    this.monthSelectedArea = 0;
    this.setPlanningAreaListsInSelectedArea();
  }

  setPlanningAreaListsInSelectedArea() {
    this.planningAreaListsInSelectedArea = [];

    const dayStart = this.firstDaySelected.day - 1;
    const monthStart = this.monthList[this.monthSelectedArea].month;
    const yearStart = this.yearSelected;
    const start = Date.parse(dayStart + ' ' + monthStart + ' ' + yearStart + ' 23:00');

    const dayEnd = this.lastDaySelected.day + 1;
    const monthEnd = this.monthList[this.monthSelectedArea].month;
    const yearEnd = this.yearSelected;
    const end = Date.parse(dayEnd + ' ' + monthEnd + ' ' + yearEnd + ' 01:00');

    let timeStartArea;
    let inFlight;
    let tmpAreaList;

    for ( const a of this.workOrder.aircraftList) {
      const aircraft = this.aircraftService.findAircraftByName(a.name);
      tmpAreaList = [];
      timeStartArea = start;
      inFlight = false;

      for ( const flight of aircraft.flightsList ) {
        if (!(flight.timeArr < start || flight.timeDep > end)) {
          if ( flight.timeDep > start ) {
            tmpAreaList.push ({
              start: timeStartArea,
              end: flight.timeDep,
              type: 'tat',
              aptArr: ''
            });
            timeStartArea = flight.timeDep;
            inFlight = true;
          }
          if ( flight.timeArr < end) {
            tmpAreaList.push ({
              start: timeStartArea,
              end: flight.timeArr,
              type: 'flight',
              aptArr: flight.aptArr
            });
            timeStartArea = flight.timeArr;
            inFlight = false;
          }
        }
      }

      tmpAreaList.push ({
        start: timeStartArea,
        end: end,
        type: (inFlight) ? 'flight' : 'tat',
        aptArr: ''
      });

      this.planningAreaListsInSelectedArea.push({
        acName: a.name,
        areaList: tmpAreaList
      });
    }
    console.log('PLANNIG AREA');
    console.log(this.planningAreaListsInSelectedArea);
  }

  isAreaTat(area): boolean {
    return area.type === 'tat';
  }

  isAreaCheck(area): boolean {
    return area.type === 'check';
  }

  isAreaFlight(area): boolean {
    return area.type === 'flight';
  }

  isAreaNightStop(area): boolean {
    return area.type === 'nightStop';
  }

  timeToHour(time): string {
    const date = new Date(time);
    const hour = date.getHours();
    const minute = date.getMinutes();

    let result = '';
    result = (hour < 10) ? result + '0' + hour : result + hour;
    result = (minute < 10) ? result + ':0' + minute : result + ':' + minute;

    return result;
  }

  setWidthArea( area, container ): string {
    const dayStart = this.firstDaySelected.day - 1;
    const monthStart = this.monthList[this.monthSelectedArea].month;
    const yearStart = this.yearSelected;
    const start = Date.parse(dayStart + ' ' + monthStart + ' ' + yearStart + ' 23:00');

    const dayEnd = this.lastDaySelected.day + 1;
    const monthEnd = this.monthList[this.monthSelectedArea].month;
    const yearEnd = this.yearSelected;
    const end = Date.parse(dayEnd + ' ' + monthEnd + ' ' + yearEnd + ' 01:00');

    const time = end - start;
    const widthContainer = container.offsetWidth;
    const timeArea = area.end - area.start;
    const result = (widthContainer * timeArea) / time;

    return result + 'px';

  }

}
