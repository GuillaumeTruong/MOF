import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkorderService } from '../../services/workorder.service';

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

  constructor(
    private route: ActivatedRoute,
    private workorderService: WorkorderService
  ) { }

  ngOnInit() {
    this.workorderService.cast.subscribe(workorderList => this.onWorkorderListChange(workorderList));
  }

  onWorkorderListChange (workorderList): void {
    this.getWo();
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

}
