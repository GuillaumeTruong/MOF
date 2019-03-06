import { Component, OnInit } from '@angular/core';
import {WorkOrders} from '../../Class/WorkOrders';
// import {WorkordersService} from '../../services/workorders.service';
import { WorkorderService } from '../../services/workorder.service';

@Component({
  selector: 'app-workorder-panel',
  templateUrl: './workorder-panel.component.html',
  styleUrls: ['./workorder-panel.component.scss']
})
export class WorkorderPanelComponent implements OnInit {

  workorders: WorkOrders[];

  constructor(
    // private workordersService: WorkordersService,
    private workorderService: WorkorderService
    ) { }

  ngOnInit() {
    this.workorderService.cast.subscribe(workorderList => this.onWorkorderListChange(workorderList));
    // this.workorders = this.workordersService.getWorkorders();
  }

  onWorkorderListChange( workorderList ) {
    this.workorders = workorderList;
  }
}
