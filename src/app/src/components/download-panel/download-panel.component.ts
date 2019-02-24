import { Component, OnInit } from '@angular/core';
import {ImportsService} from '../../services/imports.service';
import {ImportProgress} from '../../Class/ImportProgress';

@Component({
  selector: 'app-download-panel',
  templateUrl: './download-panel.component.html',
  styleUrls: ['./download-panel.component.scss']
})
export class DownloadPanelComponent implements OnInit {

  imports: ImportProgress[];

  constructor(private importsService: ImportsService) { }

  ngOnInit() {
    this.imports = this.importsService.getImport();
  }

}
