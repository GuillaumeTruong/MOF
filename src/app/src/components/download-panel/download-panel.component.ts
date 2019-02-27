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

  importsContainWarning(): boolean {
    for (const a of this.imports) {
      if (a.status === 2 || a.status === 3) {
        return true;
      }
    }
    return false;
  }

  importsContainError(): boolean {
    for (const a of this.imports) {
      if (a.status === 4) {
        return true;
      }
    }
    return false;
  }

  getNbWarning(): number {
    let res = 0;
    for (const a of this.imports) {
      if (a.status === 2 || a.status === 3) {
        res++;
      }
    }
    return res;
  }

  getNbError(): number {
    let res = 0;
    for (const a of this.imports) {
      if (a.status === 4) {
        res++;
      }
    }
    return res;
  }

  ngOnInit() {
    this.imports = this.importsService.getImport();
  }

}
