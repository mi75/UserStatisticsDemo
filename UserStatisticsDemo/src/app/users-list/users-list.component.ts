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

  constructor(
    private toServer: ApiCallerService
  ) { }

  ngOnInit() {
    this.toServer.getData('api/userslist')
    .subscribe(
      res => this.users = res,
      error => alert(error)
    );
  }

}
