import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { Router } from '@angular/router';
import { PlugToDeliver } from '../providers/classes/plantInfo.class';

@Component({
  selector: 'app-store-delivery',
  templateUrl: './store-delivery.component.html',
  styleUrls: ['./store-delivery.component.scss']
})
export class StoreDeliveryComponent implements OnInit {
  public heads6 = [];
  public reasonCodes = [];
  public mergeClickBool = false;
  public routeTotal = [];
  public deliveredTotal = [];
  public sumPlantsDelivered = [];
  constructor(private appSharedService: AppSharedService,
    public router: Router) { }

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
    this.appSharedService.sendUserRelatedInfo().subscribe(
      res => { },
      err => console.log(err)
    );
    this.getPlugToDeliverData();
  }

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  /**
   * [Retriving all plugToDeliver objects from plugToDeliver Kind]
   * @return it returns all varities from plugToDeliver Kind
   */
  // TODO:: Make shared function
  getPlugToDeliverData() {
    return this.appSharedService.getPlugToDeliverData().subscribe(
      res => {
        this.appSharedService.varietyOptions = res;
      },
      err => {
        console.log('Plug to deliver data retrive error');
      }
    );
  }

  /**
   * [Updates plugToDeliver object to plugToDeliver Kind]
   * @param  {PlugToDeliver}   plugToDeliverData [plugToDeliver object sending from when user input value change]
   */
  // TODO:: Make shared function
  updatePlugToDeliverData(plugToDeliverData: PlugToDeliver): any {
    this.appSharedService.updatePlugToDeliverData(plugToDeliverData)
      .subscribe(res => { },
      err => {
        console.log('Update error');
      });
  }

  updateRouteTotal(index) {
    console.log(this.routeTotal, index);
    this.routeTotal[index] = 0;
    for (let i = 0; i < this.appSharedService.varietyOptions.length; i++) {
      if (this.appSharedService.varietyOptions[i].appStoreDelivery.routeNumberSale.length > 0) {
        this.routeTotal[index] += parseInt(this.appSharedService.varietyOptions[i].appStoreDelivery.routeNumberSale[index]);
      }
      this.deliveredTotal[i] = this.appSharedService.varietyOptions[i].appStoreDelivery.routeNumberSale.reduce(function (sum, value) {
        if (value) {
          return sum + parseInt(value);
        }
      }, 0);
      this.sumPlantsDelivered = this.deliveredTotal.reduce(function (sum, value) {
        return sum + value;
      }, 0);
    }
  }
}
