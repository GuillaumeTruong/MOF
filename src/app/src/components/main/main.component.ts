import { Component, OnInit } from '@angular/core';
import { WorkorderService } from '../../services/workorder.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private workorderService: WorkorderService
  ) { }

  ngOnInit() {
  }

}
