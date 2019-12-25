import { Component, OnInit, NgModule } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { usersFormat } from '../users-format';


export class Phone{
      constructor(public title: string, 
                  public price: number, 
                  public company: string)
      { }
}


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users:usersFormat[];
  startRow:number = 0;
  rowsCounter:number = 0;
  pCount:number = 1;
  pSum:number = 0;

  count:number = 0;
  localName:string = 'Tom';

  constructor(
    private toServer: ApiCallerService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  incr($event) : void {
    this.count++;
    console.log($event);
  }

  phones: Phone[] = [];
  companies: string[] = ["Apple", "Huawei", "Xiaomi", "Samsung", "LG", "Motorola", "Alcatel"];
     
  addPhone(title: string, price: number, company: string){
      this.phones.push(new Phone(title, price, company));
  }

  getUsers() {
    this.pCount = 1;
    this.toServer.getData('api/userslist?startRow=0').subscribe( res => {
      this.users = res.rows;
      this.rowsCounter = res.count;
      this.pSum = Math.ceil(this.rowsCounter/3);
    } );
    this.startRow = 0;
  }

  fbForwarding() {
    this.startRow += 3;
    this.pCount += 1;
    if (this.startRow > this.rowsCounter - 3) this.startRow = this.rowsCounter - 3;
    this.toServer.getData('api/userslist?startRow=' + this.startRow).subscribe( res => {
      this.users = res.rows;
    } );
  }

  fbReverse() {
    this.startRow -= 3;
    this.pCount -= 1;
    if (this.startRow < 0) this.startRow = 0;
    this.toServer.getData('api/userslist?startRow=' + this.startRow).subscribe( res => {
      this.users = res.rows;
    } );
  }

  toPage(page) {
    this.startRow = (page.value-1)*3;
    this.pCount = +page.value;
    if (this.startRow > this.rowsCounter - 3) this.startRow = this.rowsCounter - 3;
    this.toServer.getData('api/userslist?startRow=' + this.startRow).subscribe( res => {
      this.users = res.rows;
    } );
    page.value = "";
  }


}
