import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-statistic',
  templateUrl: './users-statistic.component.html',
  styleUrls: ['./users-statistic.component.scss']
})
export class UsersStatisticComponent implements OnInit {

  visits:any[];

  constructor(
    private toServer: ApiCallerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    let selectedUser = this.route.snapshot.paramMap.get('userId');
    this.toServer.getData('api/userstat?userId=' + selectedUser).subscribe( 
      res => this.visits = res,
      error => alert(error)
    );
  }

}
