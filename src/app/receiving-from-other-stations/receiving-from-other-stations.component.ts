import { Component, OnInit } from '@angular/core';
import { IconDialogComponent } from '../icon-dialog/icon-dialog.component';
import { AppSharedService } from '../providers/services/app-shared.service';
import { Router } from '@angular/router';

import { PlugToDeliver } from '../providers/classes/plantInfo.class';


@Component({
  selector: 'app-receiving-from-other-stations',
  templateUrl: './receiving-from-other-stations.component.html',
  styleUrls: ['./receiving-from-other-stations.component.scss']
})
export class ReceivingFromOtherStationsComponent implements OnInit {

  constructor(
    private appSharedService: AppSharedService,
    private router: Router
  ) {
  }

  public list = [];
  public heads3 = [];
  public reasonCodes = [];
  public optionsData = [];
  public mergeClickBool = false;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {
    this.list = [
      'Receiving'
    ];

    this.heads3 = [
      'Seed Lot Number',
      'Finished Trays',
      'Locator Number',
      'House#/Bay#',
      'Quantity',
      '#Discarded',
      'Reason Code'
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
          for(let i =0;i<this.appSharedService.routesToShow.length;i++){
            if(res[j].appStoreDelivery.routeNumberSale[i]){
              res[j].appStoreDelivery.routeNumberSale[i][this.appSharedService.routesToShow[i]] = !!(res[j].appStoreDelivery.routeNumberSale[i][this.appSharedService.routesToShow[i]])?res[j].appStoreDelivery.routeNumberSale[i][this.appSharedService.routesToShow[i]]:0;
            }
            else {
              let tmpObj = {};
              tmpObj[this.appSharedService.routesToShow[i]] = null;
              res[j].appStoreDelivery.routeNumberSale.push(tmpObj);
            }
          
          }          
        }
        this.appSharedService.varietyOptions = res;
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

  receivePlant(item): void {
    item.receivingInfo.receivedButonClicked =  true;
    item.receivingInfo.showReceiveButton = false;
    this.updatePlugToDeliverData(item);
  }
}
