import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  //Define Subject and Observable properties here
  subject$: BehaviorSubject<string>;
  observable$: Observable<string>;

  constructor() {
    this.init();
  }

  init() {
    // Create Subject and Observable Here
    this.subject$ = new BehaviorSubject(null);
    this.observable$ = this.subject$.asObservable();

    // Create interval here
    setInterval(() => {
      const date = new Date();

      // Place the following code on a single line when adding it
      const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      this.subject$.next(time);
    }, 3000)
  }

}
