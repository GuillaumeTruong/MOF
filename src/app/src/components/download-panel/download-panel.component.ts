import { Component, OnInit } from '@angular/core';
import {ImportsService} from '../../services/imports.service';
import {ImportProgress} from '../../Class/ImportProgress';
import {getTemplateUrl} from 'codelyzer/util/ngQuery';

@Component({
  selector: 'app-download-panel',
  templateUrl: './download-panel.component.html',
  styleUrls: ['./download-panel.component.scss']
})
export class DownloadPanelComponent implements OnInit {

  imports: ImportProgress[];
  filters: string[] = [];
  filter = 'All';

  constructor(private importsService: ImportsService) { }

  importsContainWarning(): boolean {
    for (const a of this.imports) {
      if (a.status === 2 || a.status === 3) {
        return true;
      }
    }
    return false;
  }

  setFilter(f: string): void {
    this.filter = f;
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

  submitFilter(evt) {
    this.filters.push((<HTMLInputElement>evt.target).value);
    (<HTMLInputElement>evt.target).value = '';
  }

  ngOnInit() {
    this.imports = this.importsService.getImport();
  }

}
