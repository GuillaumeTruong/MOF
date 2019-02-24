import {Component, Input, OnInit} from '@angular/core';
import {ImportProgress} from '../../Class/ImportProgress';



@Component({
  selector: 'app-progress-card',
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss']
})
export class ProgressCardComponent implements OnInit {

  @Input() importProgress: ImportProgress;

  constructor() {}


  ngOnInit() {}

}
