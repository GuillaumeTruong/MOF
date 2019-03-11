import { Component, OnInit } from '@angular/core';
import {WorkOrders} from '../../Class/WorkOrders';
import { WorkorderService } from '../../services/workorder.service';

@Component({
  selector: 'app-workorder-panel',
  templateUrl: './workorder-panel.component.html',
  styleUrls: ['./workorder-panel.component.scss']
})
export class WorkorderPanelComponent implements OnInit {

  workorders: WorkOrders[];

  constructor(
    private workorderService: WorkorderService
    ) { }

  ngOnInit() {
    this.workorderService.cast.subscribe(workorderList => this.onWorkorderListChange(workorderList));
  }

  onWorkorderListChange( workorderList ) {
    this.workorders = workorderList;
  }
}
