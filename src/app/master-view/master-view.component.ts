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
  private routeTotalQuantites: any;
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
  constructor(private appSharedService: AppSharedService,
    private router: Router) {
    this.routeTotalQuantites = {};
    this.getPlugToDeliverData();
    this.appSharedService.currentGreenHouseLocation.routes.forEach(route => {
      this.routeTotalQuantites[route.routes] = 0;
    });
  }

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
  }

  getPlugToDeliverData() {
    return this.appSharedService.getPlugToDeliverData().subscribe(
      res => {
        this.filteredVariety = this.appSharedService.varietyOptions = res;
        this.updateRouteTotal(null);
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

  updateRouteTotal(plugToDeliverData: PlugToDeliver) {
    console.log('called');
    this.totalCount = 0;
    this.totalBalanceCount = 0;
    this.sumPlantsDelivered = 0;

    // Removing Plug to deliver screen varieties
    const varietyOptions = this.filteredVariety;

    this.routeTotalQuantites = {};
    this.appSharedService.currentGreenHouseLocation.routes.forEach(route => {
      this.routeTotalQuantites[route.routes] = 0;
    });

    varietyOptions.forEach((variety, i) => {
      variety.deliverdTotal = 0;
      this.totalCount += Number(this.filteredVariety[i].salableInfo.totalFlatsToSale || 0);
      this.totalBalanceCount += Number(this.filteredVariety[i].plantingInfo.finishedTrays || 0);
      if (variety.appStoreDelivery.routeNumberSale.length > 0) {
        variety.appStoreDelivery.routeNumberSale.forEach(routeObj => {
          variety.deliverdTotal += Number(routeObj.value || 0);
          this.routeTotalQuantites[routeObj.routes] += Number(routeObj.value || 0);
        });
      }
      console.log(varietyOptions);
      this.sumPlantsDelivered += variety.deliverdTotal;
    });
    if (plugToDeliverData != null) {
      this.updatePlugToDeliverData(plugToDeliverData);
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

      this.updateRouteTotal(null);
  }

  printTable() {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            table {
              border:1px solid #000;
              width:100%;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
    //window.print();
  }

  exportExcel() {
    const exportRecords = [];
    const totalModel = {};
    totalModel['"' + this.location + '"'] = 'Total';
    totalModel['Seed Lot Number'] = [];
    totalModel['Locator'] = [];
    totalModel['House#/Bay#'] = [];
    totalModel['Total Flats To Sale'] = this.totalCount;
    console.log(this.filteredVariety);
    let tmp = 0;
    for (let i = 0; i < this.filteredVariety.length; i++) {
      console.log(this.filteredVariety[i]);
      if (_.get(this.filteredVariety[i], 'type') !== 'PLANTING') {
        continue;
      }
      const recordModel = {};
      this.location = _.get(this.filteredVariety[i], 'userGreenHouseLocation');
      recordModel['"' + this.location + '"'] = _.get(this.filteredVariety[i], 'name') + '' + (this.filteredVariety[i].weekNumber ? '  Wk' +
        this.filteredVariety[i].weekNumber : '');
      recordModel['Seed Lot Number'] = _.get(this.filteredVariety[i], 'plugTray.seedLotNumber');
      recordModel['Locator'] = _.get(this.filteredVariety[i], 'plantingInfo.locatorNumber');
      recordModel['House#/Bay#'] = _.get(this.filteredVariety[i], 'plantingInfo.houseBay');
      recordModel['Total Flats To Sale'] = _.get(this.filteredVariety[i], 'salableInfo.totalFlatsToSale');
      for (let j = 0; j < this.appSharedService.currentGreenHouseLocation.routes.length; j++) {
        let routes = this.appSharedService.currentGreenHouseLocation.routes[j];
        recordModel['Route' + this.appSharedService.currentGreenHouseLocation.routes[j].routes + (routes.nick_name? '('+routes.nick_name+')' : '')] = _.get(this.filteredVariety[i], 'appStoreDelivery.routeNumberSale.' + j).value || 0;
        totalModel['Route' + this.appSharedService.currentGreenHouseLocation.routes[j].routes + (routes.nick_name? '('+routes.nick_name+')' : '')] = (totalModel['Route' + this.appSharedService.currentGreenHouseLocation.routes[j].routes + (routes.nick_name? '('+routes.nick_name+')' : '')] || 0) + parseInt(_.get(this.filteredVariety[i], 'appStoreDelivery.routeNumberSale.' + j).value || 0);
      
      }

      recordModel['Delivered'] = _.get(this.filteredVariety[i], 'deliverdTotal');
      recordModel['Discarded'] = _.get(this.filteredVariety[i], 'appStoreDelivery.discarded');
      recordModel['Reason Code'] = _.get(this.filteredVariety[i], 'appStoreDelivery.reasonCode');
      recordModel['Total Balance'] = _.get(this.filteredVariety[i], 'plantingInfo.finishedTrays');
      recordModel['Check'] = _.get(this.filteredVariety[i], 'appStoreDelivery.check');

      exportRecords.push(recordModel);
    }

    totalModel['Delivered'] = this.sumPlantsDelivered;
    totalModel['Discarded'] = [];
    totalModel['Reason Code'] = [];
    totalModel['Total Balance'] = this.totalBalanceCount;
    totalModel['Check'] = [];
    exportRecords.push(totalModel);

    new Angular2Csv(exportRecords, "BonnieReport", { headers: Object.keys(exportRecords[0]), fieldSeparator: ',' });
  }
}