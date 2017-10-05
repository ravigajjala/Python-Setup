import {FormControl} from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {IconDialogComponent} from '../icon-dialog/icon-dialog.component';
import {CommonDataService} from '../providers/services/common-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-receiving-from-other-stations',
  templateUrl: './receiving-from-other-stations.component.html',
  styleUrls: ['./receiving-from-other-stations.component.scss']
})
export class ReceivingFromOtherStationsComponent implements OnInit{

  constructor(
    public commonData:CommonDataService,
    public dialog: MdDialog,
    public router: Router
  ) {}

  public list = [];
  public heads3 = [];
  public reasonCodes = [];
  public optionsData = [];
  public myControl: FormControl;
  public mergeClickBool = false;
  private isSorted = false;
  public active = 3;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {


    if(this.commonData.getStage()==0){
      this.router.navigate(["/"]);
    }else{
      console.error('Something went wrong with routing/redirecting');
    }


    this.heads3 = [
      'Seed Lot Number',
      'Finished Trays',
      'Locator Number',
      'House#/Bay#',
      'Quantity',
      'Locator #',
      '#Discarded',
      'Reason Code'
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

  receivePlant(item){
    item.received = true;
  }
  

}
