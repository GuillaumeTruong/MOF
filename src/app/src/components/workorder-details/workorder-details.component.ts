import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkorderService } from '../../services/workorder.service';
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
      month: "January",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    },{
      month: "February",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false
      ]
    },{
      month: "March",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    },{
      month: "April",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false
      ]
    },{
      month: "May",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    },{
      month: "June",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false
      ]
    },{
      month: "July",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    },{
      month: "August",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    },{
      month: "September",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false
      ]
    },{
      month: "October",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ]
    },{
      month: "November",
      daySelected: [
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false
      ]
    },{
      month: "December",
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

  constructor(
    private route: ActivatedRoute,
    private workorderService: WorkorderService,
    private timeManagementService:TimeManagementService
  ) { }

  ngOnInit() {
    this.workorderService.cast.subscribe(workorderList => this.onWorkorderListChange(workorderList));
    this.timeManagementService.cast.subscribe(time => this.timeChange(time));
    this.initDayList();
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
      let tmp = [];
      let nb = 1;
      for (let day of this.monthList[i].daySelected) {
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
      for (let day of this.monthList[i].daySelected) {
        day.selected = false;
      }
    }
    dayselected.selected = true;
  }

  isMouseDown = false;
  firstDaySelected;
  lastDaySelected;

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
    if(this.isMouseDown) {
      this.lastDaySelected = dayselected;
      this.setSeclectedArea();
    }
  }

  setSeclectedArea(): void {
    for (let d of this.monthList[this.selectedMonthIndex].daySelected) {
      if (d.day >= this.firstDaySelected.day && d.day <= this.lastDaySelected.day ) {
        d.selected = true;
      } else {
        d.selected = false;
      }
    }
  }

}
