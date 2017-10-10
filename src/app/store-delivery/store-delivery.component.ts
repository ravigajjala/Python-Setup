import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { AppStoreDelivery } from '../providers/classes/plantInfo.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-delivery',
  templateUrl: './store-delivery.component.html',
  styleUrls: ['./store-delivery.component.scss']
})
export class StoreDeliveryComponent implements OnInit {

  constructor(private appSharedService: AppSharedService,
    public router: Router) { }

  public heads6 = [];
  public reasonCodes = [];
  public mergeClickBool = false;
  public routeTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public deliveredTotal = [];
  public sumPlantsDelivered = 0;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

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

    this.reasonCodes = [
      { 'code': 'A', 'reason': 'Poor germ' },
      { 'code': 'B', 'reason': 'Pest issue' },
      { 'code': 'C', 'reason': 'irrigation problems' },
      { 'code': 'D', 'reason': 'Disease' },
      { 'code': 'E', 'reason': 'Excess' },
      { 'code': 'F', 'reason': 'Fell/Dropped' },
      { 'code': 'G', 'reason': 'Other/Act Of God' },
    ];
  }

  // updateRouteTotal(index) {
  //   console.log(this.routeTotal, index);
  //   this.routeTotal[index] = 0;
  //   for (let i = 0; i < this.data2.length; i++) {
  //     if (this.data2[i].routeValue[index]) {
  //       this.routeTotal[index] += parseInt(this.data2[i].routeValue[index]);
  //     }
  //     this.deliveredTotal[i] = this.data2[i].routeValue.reduce(function (sum, value) {
  //       if (value) {
  //         return sum + parseInt(value);
  //       }
  //     }, 0)
  //     this.sumPlantsDelivered = this.deliveredTotal.reduce(function (sum, value) {
  //       return sum + value;
  //     }, 0)
  //   }
  // }
}
