import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { Router } from '@angular/router';
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

  public heads6 = [];
  public mergeClickBool = false;
   
  public weekNumbers: number[] = [];
  public startWeek = null;
  public endWeek = null;
  public testData = [
    {name: "test 1", age: 13},
    {name: "test 2", age: 15},
    {name: "test 3", age: 16},
    {name: "test 4", age: 18}
  ];
  public filteredVariety = [];
  ngOnInit() {
    this.weekNumbers = [null];
    for(let i=1; i<100;i++){
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

  testChange(v){
    alert(this.startWeek);
  } 

  filterVariety() {
    alert("test");
    this.filteredVariety = [];
    for(let i =0;i<this.appSharedService.varietyOptions.length;i++){
      if(this.startWeek==null && this.endWeek==null){
        this.filteredVariety = this.appSharedService.varietyOptions;
      } else if(_.get(this.appSharedService.varietyOptions[i], 'weekNumber') >= this.startWeek
        && _.get(this.appSharedService.varietyOptions[i], 'weekNumber') <= this.endWeek){
          this.filteredVariety.push(this.appSharedService.varietyOptions[i]);
        }
        
    }
    //return this.filteredVariety;
  }

  exportExcel(){
    let exportRecords  = [];

    console.log(this.appSharedService.varietyOptions);
    for(let i =0;i<this.filteredVariety.length;i++){
      console.log(this.filteredVariety[i]);
        if(_.get(this.filteredVariety[i], 'type') !=='PLANTING') continue;
        let recordModel = {};
        recordModel['variety']=_.get(this.filteredVariety[i], 'name') + '' + (this.filteredVariety[i].weekNumber ? '  Wk' + this.filteredVariety[i].weekNumber : ''); 
        recordModel['seed alot Number']=_.get(this.filteredVariety[i], 'plugTray.seedLotNumber'); 
        recordModel['Locator']=_.get(this.filteredVariety[i], 'plantingInfo.locatorNumber'); 
        recordModel['House BAY']=_.get(this.filteredVariety[i], 'plantingInfo.houseBay'); 
        recordModel['total flats for sale']=_.get(this.filteredVariety[i], 'salableInfo.totalFlatsToSale'); 
        ///recordModel['routes 71']=_.get(this.appSharedService.varietyOptions[i], ''); 
        //recordModel['routes']=_.get(this.appSharedService.varietyOptions[i], ''); 
        for(let j=0; j < this.appSharedService.routesToShow.length;j++){
          recordModel['routes' + this.appSharedService.routesToShow[j]]=_.get(this.filteredVariety[i], 'appStoreDelivery.routeNumberSale.'+j); 
        }

        recordModel['delivered']=_.get(this.filteredVariety[i], 'appStoreDelivery.delivered'); 
        recordModel['discarded']=_.get(this.filteredVariety[i], 'appStoreDelivery.discarded'); 

        exportRecords.push(recordModel);
    }

    new Angular2Csv(exportRecords, "testReport", {headers:Object.keys(exportRecords[0])});
  }
}
