import {Component, Input, OnInit} from '@angular/core';
import {UploadProgress} from '../../Class/UploadProgress';
import {ImportProgress} from '../../Class/ImportProgress';

@Component({
  selector: 'app-upload-card',
  templateUrl: './upload-card.component.html',
  styleUrls: ['./upload-card.component.scss']
})
export class UploadCardComponent implements OnInit {

  @Input() uploadProgress: UploadProgress;
  @Input() imports: ImportProgress[];

  constructor() {}

  getLabelImport(): string {
    if (this.imports == null || this.imports.length === 0) {
      return 'Finished';
    }
    let t = 0;
    let isAllFinished = true;
    for (const i of this.imports) {
      isAllFinished = i.status !== 1 ? false : isAllFinished;
      t = i.time > t ? i.time : t;
    }
    return isAllFinished ? 'Finished' : 'Remaining time: ' + this.formatSecond(t);
  }

  getLabelUpload(): string {
    switch (this.uploadProgress.status) {
      case 0:
      case 3:
        return '' + this.uploadProgress.date;
      case 1:
        return 'Started';
      case 2:
        return 'Finished';
      case 4:
        return 'ERROR!!!';
      default:
        return '/!\\ State undefined';
    }
  }

  ngOnInit() {
  }

  formatSecond(s: number): string {
    const min = this.divEucl(s, 60);
    return min === 0 ? s + 's' : min + 'min';
  }

  divEucl(a: number, b: number) {
    return Math.trunc(a / b);
  }

}
