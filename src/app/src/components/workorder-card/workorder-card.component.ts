import {Component, Input, OnInit} from '@angular/core';
import {WorkOrders} from '../../Class/WorkOrders';
import {MatDialog} from '@angular/material';



@Component({
  selector: 'app-workorder-card',
  templateUrl: './workorder-card.component.html',
  styleUrls: ['./workorder-card.component.scss']
})
export class WorkOrderCardComponent implements OnInit {

  @Input() WorkOrders: WorkOrders;

  constructor() {}


  ngOnInit() {}

  OnMatCardClickEvent(item: any) {
    console.log(item.woId);
    }
}
