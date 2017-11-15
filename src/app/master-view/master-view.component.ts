import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { Router } from '@angular/router';
import { PlugToDeliver } from '../providers/classes/plantInfo.class';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as _ from 'lodash';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit {

  constructor(private appSharedService: AppSharedService,
    private router: Router) { }
  public message: string;
  public heads6 = [];
  public mergeClickBool = false;
  public weekNumbers: number[] = [];
  public sumPlantsDelivered = 0;
  public deliveredTotal = [];
  public totalCount = 0;
  public totalBalanceCount = 0;
  public startWeek = null;
  public endWeek = null;
  public filteredVariety = [];
  public location = null;

  ngOnInit() {
    this.appSharedService.currentMessage.subscribe(message => { this.filterVariety() });
    this.weekNumbers = [null];
    for (let i = 1; i < 55; i++) {
      this.weekNumbers.push(i);
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
    this.appSharedService.sendUserRelatedInfo().subscribe(
      res => { },
      err => console.log(err)
    );
    this.filteredVariety = this.appSharedService.varietyOptions;
    this.getPlugToDeliverData();
  }

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
        this.filteredVariety = this.appSharedService.varietyOptions = res;
        this.totalCount = this.totalBalanceCount = this.sumPlantsDelivered = 0;
        res.forEach(obj => { this.totalCount = this.totalCount + (obj.salableInfo.totalFlatsToSale || 0) });
        res.forEach(obj => { this.totalBalanceCount = this.totalBalanceCount + (obj.plantingInfo.finishedTrays || 0) });
        res.forEach(obj => { this.sumPlantsDelivered = this.sumPlantsDelivered + (obj.appStoreDelivery.delivered || 0) });
      },
      err => {
        console.log('Plug to deliver data retrive error');
      }
    );
  }

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
    this.deliveredTotal = [];
    this.sumPlantsDelivered = 0;
    for (let i = 0; i < this.filteredVariety.length; i++) {
      this.totalCount = this.totalCount + parseInt(this.filteredVariety[i].salableInfo.totalFlatsToSale || 0)
      this.totalBalanceCount = this.totalBalanceCount + parseInt(this.filteredVariety[i].plantingInfo.finishedTrays || 0)
      if (this.filteredVariety[i].appStoreDelivery.routeNumberSale.length > 0) {
        this.appSharedService.routeTotal[index] += (parseInt(Object.values(this.appSharedService.varietyOptions[i].appStoreDelivery.routeNumberSale[index])[0]) || 0);
      }
      this.deliveredTotal[i] = this.filteredVariety[i].appStoreDelivery.routeNumberSale.reduce(function (sum, value) {
        if (value) {
          return sum + parseInt(Object.values(value)[0] || 0);
        }
      }, 0);
      this.filteredVariety[i].appStoreDelivery.delivered = this.deliveredTotal[i];
      this.sumPlantsDelivered = this.deliveredTotal.reduce(function (sum, value) {
        return sum + parseInt(value || 0);
      }, 0);
    }

  }

  filterVariety() {
    if (!this.appSharedService.varietyOptions) {
      return false;
    }
    this.filteredVariety = [];
    for (let i = 0; i < this.appSharedService.varietyOptions.length; i++) {
      if (this.startWeek == null && this.endWeek == null) {
        this.filteredVariety = this.appSharedService.varietyOptions;
      } else if (_.get(this.appSharedService.varietyOptions[i], 'weekNumber') >= this.startWeek
        && _.get(this.appSharedService.varietyOptions[i], 'weekNumber') <= this.endWeek) {
        this.filteredVariety.push(this.appSharedService.varietyOptions[i]);
      }
    }

    for (let i = 0; i < this.appSharedService.routeTotal.length; i++) {
      this.updateRouteTotal(i, null);
    }
  }

  exportExcel() {
    let exportRecords = [];

    console.log(this.appSharedService.varietyOptions);
    for (let i = 0; i < this.filteredVariety.length; i++) {
      console.log(this.filteredVariety[i]);
      if (_.get(this.filteredVariety[i], 'type') !== 'PLANTING') continue;
      let recordModel = {};
      this.location = _.get(this.filteredVariety[i], 'userGreenHouseLocation');
      recordModel['"' + this.location + '"'] = _.get(this.filteredVariety[i], 'name') + '' + (this.filteredVariety[i].weekNumber ? '  Wk' + this.filteredVariety[i].weekNumber : '');
      recordModel['Seed Lot Number'] = _.get(this.filteredVariety[i], 'plugTray.seedLotNumber');
      recordModel['Locator'] = _.get(this.filteredVariety[i], 'plantingInfo.locatorNumber');
      recordModel['House#/Bay#'] = _.get(this.filteredVariety[i], 'plantingInfo.houseBay');
      recordModel['Total Flats To Sale'] = _.get(this.filteredVariety[i], 'salableInfo.totalFlatsToSale');
      for (let j = 0; j < this.appSharedService.currentGreenHouseLocation.routes.length; j++) {
        recordModel['Route' + this.appSharedService.currentGreenHouseLocation.routes[j]] = _.get(this.filteredVariety[i], 'appStoreDelivery.routeNumberSale.' + j);
      }

      recordModel['Delivered'] = _.get(this.filteredVariety[i], 'appStoreDelivery.delivered');
      recordModel['Discarded'] = _.get(this.filteredVariety[i], 'appStoreDelivery.discarded');
      recordModel['Reason Code'] = _.get(this.filteredVariety[i], 'appStoreDelivery.reasonCode');
      recordModel['Total Balance'] = _.get(this.filteredVariety[i], 'plantingInfo.finishedTrays');
      recordModel['Check'] = _.get(this.filteredVariety[i], 'appStoreDelivery.check');

      exportRecords.push(recordModel);
    }

    let totalModel = {};
    totalModel['"' + this.location + '"'] = 'Total';
    totalModel['Seed Lot Number'] = [];
    totalModel['Locator'] = [];
    totalModel['House#/Bay#'] = [];
    totalModel['Total Flats To Sale'] = this.totalCount;

    for (let j = 0; j < this.appSharedService.routeTotal.length; j++) {
      totalModel['routes' + this.appSharedService.currentGreenHouseLocation.routes[j]] = this.appSharedService.routeTotal[j];
    }

    totalModel['Delivered'] = this.sumPlantsDelivered;
    totalModel['Discarded'] = [];
    totalModel['Reason Code'] = [];
    totalModel['Total Balance'] = this.totalBalanceCount;
    totalModel['Check'] = [];
    exportRecords.push(totalModel);

    new Angular2Csv(exportRecords, "BonnieReport", { headers: Object.keys(exportRecords[0]), fielddSeparator: ',' });
  }
}
