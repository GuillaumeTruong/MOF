import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ImportProgress} from '../Class/ImportProgress';
import data from '../data/Imports.json';

@Injectable({
  providedIn: 'root'
})
export class ImportsService {

  private importList = new BehaviorSubject<any>({});

  constructor() {
    this.editImportList(<any>data);
    console.log('ImportList from json');
    console.log(this.importList);
  }

  editImportList( newImportList ) {
    this.importList.next(newImportList);
  }

  getImport(): ImportProgress[] {
    const imports: ImportProgress[] = [];
    for (const i of (this.importList.value.ImportList)) {
      const tmpImport = {
        acId: i.acId,
        acName: i.acName,
        partNumber: i.partNumber,
        fileSize: i.fileSize,
        progress: i.progress,
        time: i.time,
        status: i.status,
        connexion: i.connexion,
        WO: i.WO
      };
      imports.push(tmpImport);
    }
    return imports;
  }
}
