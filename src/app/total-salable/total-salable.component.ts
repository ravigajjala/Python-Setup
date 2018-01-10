import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { Router } from '@angular/router';

import { PlugToDeliver } from '../providers/classes/plantInfo.class';

@Component({
  selector: 'app-total-salable',
  templateUrl: './total-salable.component.html',
  styleUrls: ['./total-salable.component.scss']
})
export class TotalSalableComponent implements OnInit {

  constructor(private appSharedService: AppSharedService,
    public router: Router) {

    this.appSharedService.currentGreenHouseLocation = this.appSharedService.currentGreenHouseLocation || {
      code: null,
      datastore_id: null,
      city: null,
      state: null,
      first_name: null,
      last_name: null,
      email: null,
      locatorNumber: null,
      shipToLocations: [],
      routes: []
    };
  }
  public reasonCodes = [];
  public heads5 = [];
  public mergeClickBool = false;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {
    this.heads5 = [
      'Seed Lot Number',
      'Finished trays',
      'Locator #',
      'House#/Bay#',
      '#Discarded',
      'Reason Code',
      'Total Flats to Sale'
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
      if (message === "updated_location") {
        this.getPlugToDeliverData()
      }

    });
  }

  /**
   * [Retriving all plugToDeliver objects from plugToDeliver Kind]
   * @return it returns all varities from plugToDeliver Kind
   */
  // TODO:: Make shared function
  getPlugToDeliverData() {
    return this.appSharedService.getPlugToDeliverData().subscribe(
      varieties => {
        this.appSharedService.varietyOptions = varieties;
        this.appSharedService.varietyOptions.forEach(vareity => {
          // Subtracting shipping quantities from flatsToSale
          vareity.flatsToSaleAfterShipping = Number(vareity.plantingInfo.finishedTrays);
          vareity.shipToInfo.forEach(location => {
            vareity.flatsToSaleAfterShipping = vareity.flatsToSaleAfterShipping - Number(location.qty);
          });
        });
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
    plugToDeliverData.salableInfo.reasonCode = plugToDeliverData.salableInfo.discarded === 0 ? null : plugToDeliverData.salableInfo.reasonCode;
    plugToDeliverData.salableInfo.totalFlatsToSale = plugToDeliverData.flatsToSaleAfterShipping - plugToDeliverData.salableInfo.discarded;
    this.appSharedService.updatePlugToDeliverData(plugToDeliverData)
      .subscribe(res => { },
      err => {
        console.log('Update error');
      });
  }
}
