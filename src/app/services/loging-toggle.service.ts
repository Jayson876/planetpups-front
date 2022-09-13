import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogingToggleService {
  showForm!: BehaviorSubject<boolean>;
  constructor() {
    this.showForm = new BehaviorSubject<boolean>(false);
  }

  setValue() {
    if (this.showForm.value === false) {
      this.showForm.next(true);
    } else {
      this.showForm.next(false);
    }
  }

  getValue(): Observable<boolean> {
    return this.showForm.asObservable();
  }
}
