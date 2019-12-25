import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransComponentsService {

  constructor() { }

//   public isUserLoggedIn = new Subject();

//   setUserLoggedIn(loggedIn: boolean) {
//     this.isUserLoggedIn.next(loggedIn);
//  }

private clickCnt:number = 0;
onClick = new EventEmitter<number>();

  public doClick(fromForm){
    this.clickCnt = fromForm;
    this.onClick.emit(this.clickCnt);
  }

}
