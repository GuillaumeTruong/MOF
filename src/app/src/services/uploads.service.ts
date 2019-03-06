import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import data from '../data/Uploads.json';
import {ImportProgress} from '../Class/ImportProgress';
import {UploadProgress} from '../Class/UploadProgress';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  private uploadList = new BehaviorSubject<any>({});

  constructor() {
    this.editUploadList(<any>data);
    console.log('UploadList from json');
    console.log(this.uploadList);
  }

  editUploadList( newUploadList ) {
    this.uploadList.next(newUploadList);
  }

  getUpload(): UploadProgress[] {
    const uploads: UploadProgress[] = [];
    for (const i of (this.uploadList.value.UploadList)) {
      const tmpUpload = {
        acId: i.acId,
        acName: i.acName,
        FINs: i.FINs,
        partNumbers: i.partNumbers,
        progress: i.progress,
        time: i.time,
        status: i.status,
        connexion: i.connexion,
        WO: i.WO,
        date: i.date,
        duration: i.duration
      };
      uploads.push(tmpUpload);
    }
    return uploads;
  }
}
