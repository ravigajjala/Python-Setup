import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MatAutocompleteTrigger } from '@angular/material';
import { IconDialogComponent } from '../icon-dialog/icon-dialog.component';
import { CommonDataService } from '../providers/services/common-data.service';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ship-to-other-stations',
  templateUrl: './ship-to-other-stations.component.html',
  styleUrls: ['./ship-to-other-stations.component.scss']
})
export class ShipToOtherStationsComponent implements OnInit {

  constructor(public commonData: CommonDataService, public router: Router, public dialog: MdDialog, private zone: NgZone) { }

  public heads4 = [];
  public mergeClickBool = false;
  private isSorted = false;
  public active = 4;
  public disabledColumns = [];
  public totalOfLocation = [, , , , 0, 0, 0, 0, 0];
  public locationNames = ['Chicago', 'Minneapolis', 'Des Moines', 'Milwaukee', 'St.Louis'];
  public showAC = false;
  public newCity = '';

  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {

    if (this.commonData.getStage() === 0) {
      this.router.navigate(['/']);
    } else {
      console.error('Something went wrong with routing/redirecting');
    }


    this.heads4 = [
      { 'name': 'Seed Lot Number', 'icon': 'down' },
      { 'name': 'Finished Trays', 'icon': 'down' },
      { 'name': 'Locator Number', 'icon': 'down' },
      { 'name': 'House#/Bay#', 'icon': 'down' },
    ];
  }



  openDialog(currentItem): void {
    const dialogRef = this.dialog.open(IconDialogComponent, {
      data: currentItem,
    });
  }

  addShipToLoc(event, newlocation) {
    this.locationNames.push(newlocation.city);
    this.totalOfLocation.push(0);
    this.newCity = '';
    this.trigger.closePanel();
    this.showAC = false;
  }

  openACPanel() {
    this.showAC = true;
    this.trigger.openPanel();
  }

  sort() {
    if (!this.isSorted) {
      this.commonData.plantData = this.commonData.plantData.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
      this.isSorted = true;
    }
    this.commonData.plantData = this.commonData.plantData.reverse();
  }

  shipColumn(item) {
    this.disabledColumns[item] = true;
  }
  cancelShip(item) {
    this.disabledColumns[item] = false;
  }

  getTotalOfColumn(key) {
    this.totalOfLocation[key + 4] = this.commonData.plantData.reduce(function (a, b) {
      return a + parseInt(b.shipToData.locationValues[key] || 0);
    }, 0);
    console.log(this.totalOfLocation);
  }

}
