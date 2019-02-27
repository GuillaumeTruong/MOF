import { Component, OnInit } from '@angular/core';
import {WorkOrders} from '../../Class/WorkOrders';
import {WorkordersService} from '../../services/workorders.service';

@Component({
  selector: 'app-workorder-panel',
  templateUrl: './workorder-panel.component.html',
  styleUrls: ['./workorder-panel.component.scss']
})
export class WorkorderPanelComponent implements OnInit {

  workorders: WorkOrders[];

  constructor(private workordersService: WorkordersService) { }

  ngOnInit() {
    this.workorders = this.workordersService.getWorkorders();
  }
}
