import { DUMMY_DATA1, DUMMY_DATA2 } from './../dummy';
import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {IconDialogComponent} from '../icon-dialog/icon-dialog.component';
import {CommonDataService} from '../providers/services/common-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ship-to-other-stations',
  templateUrl: './ship-to-other-stations.component.html',
  styleUrls: ['./ship-to-other-stations.component.scss']
})
export class ShipToOtherStationsComponent implements OnInit {

  constructor(public commonData: CommonDataService, public router : Router, public dialog: MdDialog) { }

  public data1 = DUMMY_DATA1;
  public data2 = DUMMY_DATA1;
  public heads4 = [];
  public mergeClickBool = false;
  private isSorted = false;
  public active = 4;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {

    if(this.commonData.getStage()==0){
      this.router.navigate(["/"]);
    }else{
      console.error('Something went wrong with routing/redirecting');
    }


    this.heads4 = [
      {'name':'Seed Lot Number', 'icon':'down'},
      {'name':'Finished Trays', 'icon':'down'},
      {'name':'Locator Number', 'icon':'down'},
      {'name':'House#/Bay#', 'icon':'down'},
      {'name':'Ship to Chicago', 'icon':'cross'},
      {'name':'Ship to Minneapolis', 'icon':'cross'},
      {'name':'Ship to Des Moines', 'icon':'cross'},
      {'name':'Ship to Milwaukee', 'icon':'cross'},
      {'name':'Ship to St.Louis', 'icon':'cross'},
      {'name':'Add Ship to', 'icon':'add'}
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

  shipPlant(item){
    item.shipped = true;
  }
  cancelShip(item){
    item.shipped=false;
  }

}
