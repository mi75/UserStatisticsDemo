import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { usersFormat } from '../users-format';

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

  constructor(
    private toServer: ApiCallerService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.pCount = 1;
    this.toServer.getData('api/userslist?startRow=0').subscribe( res => {
      this.users = res.rows;
      this.rowsCounter = res.count;
      this.pSum = this.rowsCounter/50;
    } );
    this.startRow = 0;
  }

  fbForwarding() {
    this.startRow += 50;
    this.pCount += 1;
    if (this.startRow > this.rowsCounter - 50) this.startRow = this.rowsCounter - 50;
    this.toServer.getData('api/userslist?startRow=' + this.startRow).subscribe( res => {
      this.users = res.rows;
    } );
  }

  fbReverse() {
    this.startRow -= 50;
    this.pCount -= 1;
    if (this.startRow < 0) this.startRow = 0;
    this.toServer.getData('api/userslist?startRow=' + this.startRow).subscribe( res => {
      this.users = res.rows;
    } );
  }

  toPage(page) {
    this.startRow = (page.value-1)*50;
    this.pCount = page.value;
    if (this.startRow > this.rowsCounter - 50) this.startRow = this.rowsCounter - 50;
    this.toServer.getData('api/userslist?startRow=' + this.startRow).subscribe( res => {
      this.users = res.rows;
    } );
  }

}
