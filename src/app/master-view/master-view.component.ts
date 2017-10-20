import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit {

  constructor(private appSharedService: AppSharedService,
    private router: Router) { }

  public heads6 = [];
  public mergeClickBool = false;
  public weekNumbers = [1, 2, 3, 4, 5];
  public startWeek = 1;
  public endWeek = 5;

  ngOnInit() {
    this.heads6 = [
      'Seed Lot Number',
      'Locator #',
      'House#/Bay#',
      'Total Flats to Sale',
      ['68-00',
        '68-01',
        '68-02',
        '68-03',
        '68-04',
        '68-05',
        '68-06',
        '68-07',
        '68-08',
        '68-09',
        '68-10',
        '68-11',
        '68-12',
        '68-13',
        '68-14',
        '68-15'],
      'Delivered',
      ['#Discarded',
        'Reason Code'],
      'Total Balance',
      'Check'
    ];
    this.appSharedService.sendUserRelatedInfo().subscribe(
      res => { },
      err => console.log(err)
    );
  }
}
