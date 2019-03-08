import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {ImportsService} from '../../services/imports.service';
import {ImportProgress} from '../../Class/ImportProgress';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTabChangeEvent} from '@angular/material';
import {UploadsService} from '../../services/uploads.service';
import {UploadProgress} from '../../Class/UploadProgress';


@Component({
  selector: 'app-download-panel',
  templateUrl: './download-panel.component.html',
  styleUrls: ['./download-panel.component.scss']
})
export class DownloadPanelComponent implements OnInit {

  imports: ImportProgress[];
  uploads: UploadProgress[];
  filters: string[] = [];
  filter = 'All';
  sort = 'State';
  order = true;
  selectedTab = 0;

  constructor(private importsService: ImportsService, private uploadsService: UploadsService, public dialog: MatDialog) { }

  changeOrder(): void {
    this.order = !this.order;
  }

  clearAllFinished(): void {
    if (this.selectedTab === 0) {
      const temp = [];
      for (let i = 0; i < this.imports.length; i++) {
        if (this.imports[i].status !== 1) {
          temp.push(this.imports[i]);
        }
      }
      this.imports = temp;
    } else {
      const temp = [];
      for (let i = 0; i < this.uploads.length; i++) {
        if (this.uploads[i].status !== 2) {
          temp.push(this.uploads[i]);
        }
      }
      this.uploads = temp;
    }
  }

  setSort(s: string): void {
    this.sort = s;
  }

  setSelectedTab(evt): void {
    this.selectedTab = (<MatTabChangeEvent>evt).index;
    console.log(this.selectedTab);
  }

  openDialog(): void {
    this.dialog.open(FilterDownloadDialogComponent, {
      data: this.filters
    });
  }

  setFilter(f: string): void {
    this.filter = f;
  }

  importsContainFinished(): boolean {
    for (const a of this.imports) {
      if (a.status === 1) {
        return true;
      }
    }
    return false;
  }

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

  getNbFinished(): number {
    let res = 0;
    for (const a of this.imports) {
      if (a.status === 1) {
        res++;
      }
    }
    return res;
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

  uploadsContainFinished(): boolean {
    for (const a of this.uploads) {
      if (a.status === 2) {
        return true;
      }
    }
    return false;
  }

  uploadsContainWarning(): boolean {
    for (const a of this.uploads) {
      if (a.status === 3) {
        return true;
      }
    }
    return false;
  }

  uploadsContainError(): boolean {
    for (const a of this.uploads) {
      if (a.status === 4) {
        return true;
      }
    }
    return false;
  }

  getNbFinishedUploads(): number {
    let res = 0;
    for (const a of this.uploads) {
      if (a.status === 2) {
        res++;
      }
    }
    return res;
  }

  getNbWarningUploads(): number {
    let res = 0;
    for (const a of this.uploads) {
      if (a.status === 3) {
        res++;
      }
    }
    return res;
  }

  getNbErrorUploads(): number {
    let res = 0;
    for (const a of this.uploads) {
      if (a.status === 4) {
        res++;
      }
    }
    return res;
  }

  getImportsToolTip(): string {
    let res = '';
    const err = this.getNbError();
    const war = this.getNbWarning();
    const fin = this.getNbFinished();
    if (err !== 0) {
      res += '- ' + err + ' Error';
      if (err > 1) {
        res += 's';
      }
    }
    if (war !== 0) {
      if (res.length !== 0) {
        res += '\n';
      }
      res += '- ' + war + ' warning';
      if (war > 1) {
        res += 's';
      }
    }
    if (fin !== 0) {
      if (res.length !== 0) {
        res += '\n';
      }
      res += '- ' + fin + ' finished';
    }
    return res;
  }

  getImports(wo: string, ac: string): ImportProgress[] {
    const res = []
    for (const i of this.imports) {
      if (i.WO === wo && i.acName === ac) {
        res.push(i);
      }
    }
    return res;
  }

  getUploadsToolTip(): string {
    let res = '';
    const err = this.getNbErrorUploads();
    const war = this.getNbWarningUploads();
    const fin = this.getNbFinishedUploads();
    if (err !== 0) {
      res += '- ' + err + ' Error';
      if (err > 1) {
        res += 's';
      }
    }
    if (war !== 0) {
      if (res.length !== 0) {
        res += '\n';
      }
      res += '- ' + war + ' warning';
      if (war > 1) {
        res += 's';
      }
    }
    if (fin !== 0) {
      if (res.length !== 0) {
        res += '\n';
      }
      res += '- ' + fin + ' finished';
    }
    return res;
  }

  submitFilter(evt) {
    this.filters.push((<HTMLInputElement>evt.target).value);
    (<HTMLInputElement>evt.target).value = '';
  }

  ngOnInit() {
    this.imports = this.importsService.getImport();
    this.uploads = this.uploadsService.getUpload();
  }

}

@Component({
  selector: 'app-filter-download-dialog',
  templateUrl: './filter-download-dialog.html',
  styleUrls: ['./filter-download-dialog.scss']
})
export class FilterDownloadDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FilterDownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]) {}

  onRemoveClick(f: string): void {
    this.data.splice(this.data.indexOf(f), 1);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onClearClick(): void {
    this.data.splice(0, this.data.length);
  }

}
