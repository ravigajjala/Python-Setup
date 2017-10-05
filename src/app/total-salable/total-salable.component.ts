import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {IconDialogComponent} from '../icon-dialog/icon-dialog.component';
import {CommonDataService} from '../providers/services/common-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-salable',
  templateUrl: './total-salable.component.html',
  styleUrls: ['./total-salable.component.scss']
})
export class TotalSalableComponent implements OnInit {

  constructor(public commonData: CommonDataService,
              public router: Router,
              public dialog: MdDialog) { }

  public heads5 = [];
  public mergeClickBool = false;
  private isSorted = false;
  public active = 5;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {


    if(this.commonData.getStage()==0){
      this.router.navigate(["/"]);
    }else{
      console.error('Something went wrong with routing/redirecting');
    }


    this.heads5 = [
      'Seed Lot Number',
      'Quantity',
      'Locator #',
      'House#/Bay#',
      ['#Discarded','Reason Code'],
      'Total Flats to Sale'
    ];

  }


      

openDialog(currentItem): void {
    let dialogRef = this.dialog.open(IconDialogComponent, {
      data: currentItem,
    });
  }




  sort() {
    if ( !this.isSorted ) {
      this.commonData.plantData = this.commonData.plantData.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
      this.isSorted = true;
    }
    this.commonData.plantData = this.commonData.plantData.reverse();
  }

}
