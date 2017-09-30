import { DUMMY_DATA1, DUMMY_DATA2 } from './../dummy';
import { Component, OnInit } from '@angular/core';
import {CommonDataService} from '../providers/services/common-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit {

  constructor(public commonData: CommonDataService,
              public router: Router) { }

  public data1 = DUMMY_DATA1;
  public data2 = DUMMY_DATA1;
  public heads6 = [];
  private isSorted = false;
  public active = 7;
  public mergeClickBool = false;


  ngOnInit() {


    if(this.commonData.getStage()==0){
      this.router.navigate(["/"]);
    }else{
      console.error('Something went wrong with routing/redirecting');
    }



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
  }

  sort() {
    if ( !this.isSorted ) {
      this.data1 = this.data1.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
      this.isSorted = true;
    }
    this.data1 = this.data1.reverse();
  }

}
