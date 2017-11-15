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
  public deliveredTotal = [];
  public sumPlantsDelivered = 0;
  public totalCount = 0;
  public totalBalanceCount = 0;
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
    this.appSharedService.currentMessage.subscribe(message =>  {this.getPlugToDeliverData()});
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
                
        for(let j=0;j<res.length; j++){
          if(!res[j].appStoreDelivery.routeNumberSale){
            res[j].appStoreDelivery.routeNumberSale = [];
          }
          for(let i =0;i<this.appSharedService.currentGreenHouseLocation.routes.length;i++){
            if(res[j].appStoreDelivery.routeNumberSale[i]){
              res[j].appStoreDelivery.routeNumberSale[i][this.appSharedService.currentGreenHouseLocation.routes[i]] = !!(res[j].appStoreDelivery.routeNumberSale[i][this.appSharedService.currentGreenHouseLocation.routes[i]])?res[j].appStoreDelivery.routeNumberSale[i][this.appSharedService.currentGreenHouseLocation.routes[i]]:0;
            }
            else {
              let tmpObj = {};
              tmpObj[this.appSharedService.currentGreenHouseLocation.routes[i]] = null;
              res[j].appStoreDelivery.routeNumberSale.push(tmpObj);
            }
          
          }          
        }
        this.appSharedService.varietyOptions = res;
        this.totalCount = this.totalBalanceCount = this.sumPlantsDelivered = 0;
        res.forEach(obj => { this.totalCount = this.totalCount + (obj.salableInfo.totalFlatsToSale || 0)});
        res.forEach(obj => { this.totalBalanceCount = this.totalBalanceCount + (obj.plantingInfo.finishedTrays || 0)});
        res.forEach(obj => { this.sumPlantsDelivered = this.sumPlantsDelivered + (obj.appStoreDelivery.delivered || 0)});
        //routesTotal
        for(let i =0;i<this.appSharedService.currentGreenHouseLocation.routes.length;i++){
          this.updateRouteTotal(i, null);
        }
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
  
  updateRouteTotal(index, item) {
    this.appSharedService.routeTotal[index] = 0;
    this.totalCount = 0;
    this.totalBalanceCount = 0;
    for (let i = 0; i < this.appSharedService.varietyOptions.length; i++) {
      this.totalCount = this.totalCount + parseInt(this.appSharedService.varietyOptions[i].salableInfo.totalFlatsToSale || 0)
      this.totalBalanceCount = this.totalBalanceCount + parseInt(this.appSharedService.varietyOptions[i].plantingInfo.finishedTrays || 0)
      if (this.appSharedService.varietyOptions[i].appStoreDelivery.routeNumberSale.length > 0) {
        this.appSharedService.routeTotal[index] += (parseInt(Object.values(this.appSharedService.varietyOptions[i].appStoreDelivery.routeNumberSale[index])[0]) || 0);
      }
      console.log("deliveryt...", this.appSharedService.varietyOptions[i].appStoreDelivery.routeNumberSale);
      this.deliveredTotal[i] = this.appSharedService.varietyOptions[i].appStoreDelivery.routeNumberSale.reduce(function (sum, value) {
        return sum + parseInt(Object.values(value)[0] || 0);
      }, 0);
      console.log("this my delivery total", this.deliveredTotal);
      this.appSharedService.varietyOptions[i].appStoreDelivery.delivered = this.deliveredTotal[i];
      this.sumPlantsDelivered = this.deliveredTotal.reduce(function (sum, value) {
        return sum + parseInt(value || 0);
      }, 0);
    }
    if(item){
    item.appStoreDelivery.check = parseInt(item.salableInfo.totalFlatsToSale || 0) - parseInt(item.appStoreDelivery.delivered || 0);
    this.updatePlugToDeliverData(item);
    }

  }
}
