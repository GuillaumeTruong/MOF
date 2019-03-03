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
  }

}
