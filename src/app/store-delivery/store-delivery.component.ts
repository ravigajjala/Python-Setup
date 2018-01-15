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
  private routeTotalQuantites: any;
  private isAddedRoute = false;
  constructor(private appSharedService: AppSharedService,
    public router: Router) {
    this.routeTotalQuantites = {};
    this.getPlugToDeliverData();
    this.appSharedService.currentGreenHouseLocation.routes.forEach(route => {
      this.routeTotalQuantites[route] = 0;
    });
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


    this.appSharedService.sendUserRelatedInfo().subscribe(
      res => { },
      err => console.log(err)
    );
    this.appSharedService.currentMessage.subscribe(message => { 
        if(message === "add_route"){
          this.isAddedRoute = true;
        }
        else {
          this.getPlugToDeliverData();
        }
    });
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
        this.updateRouteTotal(null);
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
    plugToDeliverData.appStoreDelivery.reasonCode = plugToDeliverData.appStoreDelivery.discarded === 0 ? null : plugToDeliverData.appStoreDelivery.reasonCode;
    plugToDeliverData.appStoreDelivery.check = (plugToDeliverData.salableInfo.totalFlatsToSale - plugToDeliverData.deliverdTotal);
    plugToDeliverData.appStoreDelivery.delivered = plugToDeliverData.deliverdTotal;
    this.appSharedService.updatePlugToDeliverData(plugToDeliverData)
      .subscribe(res => { },
      err => {
        console.log('Update error');
      });
  }

  updateRouteNoSale(item1, ind, routeObj) {
    // console.log("going to update route no.", ind, routeObj);
    // console.log("all routes ... to update route no.", this.appSharedService.currentGreenHouseLocation.routes);
    if(this.isAddedRoute){
    ind = ind + 1;
    
    if(!item1.appStoreDelivery.routeNumberSale[ind] && ind > 0) {
      let tmprouteObj = Object.assign({}, {value:0});
      // console.log("creatd neew object ...", tmprouteObj);
      item1.appStoreDelivery.routeNumberSale.push(tmprouteObj);
      //item1.appStoreDelivery.routeNumberSale[ind] = tmprouteObj;
    }
    // else if(item1.appStoreDelivery.routeNumberSale[ind] && !item1.appStoreDelivery.routeNumberSale[ind]['value'] && item1.appStoreDelivery.routeNumberSale[ind]['value'] === 0) {
    //   item1.appStoreDelivery.routeNumberSale[ind].value = null;
    // }
    console.log(item1.appStoreDelivery.routeNumberSale[ind], ind);
    this.isAddedRoute = false;
  }
  else {
    let tmprouteObj;
    for(let i = 0; i < this.appSharedService.currentGreenHouseLocation.routes.length; i++) {
      if(!item1.appStoreDelivery.routeNumberSale[i]){
        tmprouteObj = Object.assign({}, this.appSharedService.currentGreenHouseLocation.routes[i], {value:0});
        // console.log("creatd if ...neew object ...", tmprouteObj);
        item1.appStoreDelivery.routeNumberSale.push(tmprouteObj);
     }
     else{
       tmprouteObj = Object.assign({}, item1.appStoreDelivery.routeNumberSale[i], this.appSharedService.currentGreenHouseLocation.routes[i]);
      //  console.log("creatd else ... neew object ...", tmprouteObj);
       item1.appStoreDelivery.routeNumberSale[i] = tmprouteObj;
     }
    }
    
    //  console.log("assign neew object ...", tmprouteObj);
      
  }
  }


  // updateRouteNoSale(item1,ind) {
  //   ind = ind + 1;
  //   if (!item1.appStoreDelivery.routeNumberSale[ind]) {
  //     item1.appStoreDelivery.routeNumberSale.push({ value: null });
  //     item1.appStoreDelivery.routeNumberSale[ind] = { value: null };
  //   }
  //   else if (item1.appStoreDelivery.routeNumberSale[ind] && !item1.appStoreDelivery.routeNumberSale[ind]['value']) {
  //     item1.appStoreDelivery.routeNumberSale[ind].value = null;
  //   }
  // }

  updateRouteTotal(plugToDeliverData: PlugToDeliver) {
    this.totalCount = 0;
    this.totalBalanceCount = 0;
    this.sumPlantsDelivered = 0;

    // Removing Plug to deliver screen varieties
    const varietyOptions = this.appSharedService.varietyOptions.filter(variety => {
      return variety.type !== 'PLUG';
    });

    this.routeTotalQuantites = {};
    this.appSharedService.currentGreenHouseLocation.routes.forEach(route => {
      this.routeTotalQuantites[route.routes] = 0;
    });
    // console.log("prinitnhg routes after upddate", this.appSharedService.currentGreenHouseLocation.routes);
    varietyOptions.forEach((variety, i) => {
      variety.deliverdTotal = 0;
      this.totalCount += Number(this.appSharedService.varietyOptions[i].salableInfo.totalFlatsToSale || 0);
      this.totalBalanceCount += Number(this.appSharedService.varietyOptions[i].plantingInfo.finishedTrays || 0);
      // console.log("testing ...variety .. ", variety.appStoreDelivery.routeNumberSale);
      if (variety.appStoreDelivery.routeNumberSale.length > 0) {
        variety.appStoreDelivery.routeNumberSale.forEach(routeObj => {
          variety.deliverdTotal += Number(routeObj.value || 0);
          this.routeTotalQuantites[routeObj.routes] += Number(routeObj.value || 0);
        });
      }
      this.sumPlantsDelivered += variety.deliverdTotal;
    });
    if (plugToDeliverData != null) {
      this.updatePlugToDeliverData(plugToDeliverData);
    }
  }
}
