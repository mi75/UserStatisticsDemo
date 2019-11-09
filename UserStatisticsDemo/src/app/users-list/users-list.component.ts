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

  constructor(
    private toServer: ApiCallerService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.toServer.getData('api/userslist?startRow=0').subscribe( res => {
      this.users = res.rows;
      this.rowsCounter = res.count;
    } );
    this.startRow = 0;
  }

  fbForwarding() {
    this.startRow += 50;
    if (this.startRow > this.rowsCounter - 50) this.startRow = this.rowsCounter - 50;
    this.toServer.getData('api/userslist?startRow=' + this.startRow).subscribe( res => {
      this.users = res.rows;
    } );
  }

  fbReverse() {
    this.startRow -= 50;
    if (this.startRow < 0) this.startRow = 0;
    this.toServer.getData('api/userslist?startRow=' + this.startRow).subscribe( res => {
      this.users = res.rows;
    } );
  }

}
