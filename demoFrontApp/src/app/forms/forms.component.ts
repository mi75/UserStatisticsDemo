import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransComponentsService } from '../_services/trans-components.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  clickCnt:number = 0;
  servCnt:number = 10;

  constructor(
    private toOtherComponent: TransComponentsService
  ) { }

  ngOnInit() {
  }

  @Output() onChanged = new EventEmitter<boolean>();
  change(increased:any) {
    this.onChanged.emit(increased);
    // if(increased===true) {
    //   this.toOtherComponent.setUserLoggedIn(true);
    // } else {
    //   this.toOtherComponent.setUserLoggedIn(false);
    // }
  }

  @Input() someParam:string;
  @Output() someParamChange = new EventEmitter<string>();
  onSomeParamChange(model:string) {
    this.someParam = model;
    this.someParamChange.emit(model);
  }

  @Output() clickChange = new EventEmitter<number>();
  public clickMe(){
    this.clickCnt++;
    this.clickChange.emit(this.clickCnt);
  }

  public clickSrv() {
    this.servCnt++;
    this.toOtherComponent.doClick(this.servCnt);
  }

}
