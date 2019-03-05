import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeManagementService {

  private time = new BehaviorSubject<number>(0);

  timerInterval = 15000;
  interval;

  cast = this.time.asObservable();

  constructor() {
    this.editTime(1546317663000);
    this.startTimer();
  }

  editTime( newTime: number ) {
    this.time.next(newTime);
  }

  getTime(): number {
    return this.time.value;
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      this.editTime(this.time.value + this.timerInterval);
      console.log('time value' + this.time.value);
    }, this.timerInterval);
  }
}
