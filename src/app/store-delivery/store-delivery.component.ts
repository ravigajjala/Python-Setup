import { DUMMY_DATA1, DUMMY_DATA2 } from './../dummy';
import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {IconDialogComponent} from '../icon-dialog/icon-dialog.component';
import {CommonDataService} from '../providers/services/common-data.service';
import { AppStoreDelivery } from '../providers/classes/plantInfo.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-delivery',
  templateUrl: './store-delivery.component.html',
  styleUrls: ['./store-delivery.component.scss']
})
export class StoreDeliveryComponent implements OnInit {

  constructor(public commonData: CommonDataService,
              public router: Router,
              public dialog: MdDialog) {}

  public heads6 = [];
  public reasonCodes = [];
  public data1 = DUMMY_DATA1;
  public data2 = DUMMY_DATA1;
  public mergeClickBool = false;
  private isSorted = false;
  public active = 6;
  public routeTotal = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  public deliveredTotal = [];
  public sumPlantsDelivered = 0;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

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

    this.reasonCodes = [
      {'code':'A','reason':'Poor germ'},
      {'code':'B','reason':'Pest issue'},
      {'code':'C','reason':'irrigation problems'},
      {'code':'D','reason':'Disease'},
      {'code':'E','reason':'Excess'},
      {'code':'F','reason':'Fell/Dropped'},
      {'code':'G','reason':'Other/Act Of God'},
    ];
  }


  openDialog(currentItem): void {
    let dialogRef = this.dialog.open(IconDialogComponent, {
      data: currentItem,
    });
  }



  sort() {
    if ( !this.isSorted ) {
      this.data1 = this.data1.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
      this.isSorted = true;
    }
    this.data1 = this.data1.reverse();
  }

  updateRouteTotal(index){
    console.log(this.routeTotal, index);
    this.routeTotal[index] = 0;
    for(let i=0; i<this.data2.length;i++){
      if(this.data2[i].routeValue[index]){
        this.routeTotal[index] += parseInt(this.data2[i].routeValue[index]);
      }
      this.deliveredTotal[i] = this.data2[i].routeValue.reduce(function(sum,value){
        if(value){
          return sum + parseInt(value); 
        }
      },0)
      this.sumPlantsDelivered = this.deliveredTotal.reduce(function(sum,value){
        return sum + value;
      },0)
    }
  }

}
