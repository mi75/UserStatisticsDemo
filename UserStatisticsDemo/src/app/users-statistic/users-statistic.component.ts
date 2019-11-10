import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../_services/api-caller.service';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-users-statistic',
  templateUrl: './users-statistic.component.html',
  styleUrls: ['./users-statistic.component.scss']
})
export class UsersStatisticComponent implements OnInit {

  visits:any[];
  whichOfUsers:string;
  lineChartLabels: Label[] = [];
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Clicks' },
    { data: [], label: 'Views' },
  ];

  constructor(
    private toServer: ApiCallerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    let selectedUser = this.route.snapshot.paramMap.get('userId');
    this.whichOfUsers = selectedUser;
    this.toServer.getData('api/userstat?userId=' + selectedUser).subscribe( 
      res => {
        this.visits = res;
        for (let i=0; i<this.visits.length; i++) {
          this.lineChartLabels.push(this.visits[i].date);
          this.lineChartData[0].data.push(this.visits[i].clicks);
          this.lineChartData[1].data.push(this.visits[i].page_views);
        };
      },
      error => alert(error)
    );

  }

  getStatistics(startDate, lastDate) {
    let selectedUser = this.whichOfUsers;
    let start=startDate.value;
    let last=lastDate.value;
    this.toServer.getData('api/usersdat?userId=' + selectedUser + '&start=' + start + '&last=' + last).subscribe( 
      res => {
        this.visits = res;
        this.lineChartLabels = [];
        this.lineChartData[0].data = [];
        this.lineChartData[1].data = [];
        for (let i=0; i<this.visits.length; i++) {
          this.lineChartLabels.push(this.visits[i].date);
          this.lineChartData[0].data.push(this.visits[i].clicks);
          this.lineChartData[1].data.push(this.visits[i].page_views);
        };
      },
      error => alert(error)
    );
  }

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

}
