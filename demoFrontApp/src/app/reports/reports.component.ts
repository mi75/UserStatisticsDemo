import { Component, OnInit, Input } from '@angular/core';
import { TransComponentsService } from '../_services/trans-components.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  counter: number = 0;
  // isUserLoggedIn: boolean;
  srvCount:number=0;

  constructor(
    private fromOtherComponent: TransComponentsService
  ) {
    this.fromOtherComponent.onClick.subscribe(cnt=>this.srvCount = cnt);
   }

  ngOnInit() {
  //   this.fromOtherComponent.isUserLoggedIn.subscribe((userLoggedIn: boolean) => {
  //      this.isUserLoggedIn = userLoggedIn;
  //  });
  }

  increment() { this.counter++; }
  decrement() { this.counter--; }

  @Input() param1:string;

  // from parent via setter for check&mod:
  private _privPar:number;
  @Input()
  set param2(paramToChild2:number) {
    if(paramToChild2<2)
      this._privPar=2;
    else if(paramToChild2>5)
      this._privPar=5;
    else
      this._privPar=paramToChild2;
  }
  get param2() { return this._privPar; }

  @Input() clickCount: number;

}
