import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IconDialogComponent } from '../icon-dialog/icon-dialog.component';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-ship-to-other-stations',
  templateUrl: './ship-to-other-stations.component.html',
  styleUrls: ['./ship-to-other-stations.component.scss']
})
export class ShipToOtherStationsComponent implements OnInit {

  constructor(public appSharedService: AppSharedService, private router: Router, public dialog: MatDialog, private zone: NgZone) { }

  public heads4 = [];
  public mergeClickBool = false;
  private isSorted = false;
  public active = 4;
  public disabledColumns = [];
  public totalOfLocation = [, , , , ];
  public locationNames = [];
  public locations = [];
  public showAC = false;
  public newCity = '';
  private shipToClicked: boolean;

  @ViewChild(MatAutocompleteTrigger) trigger;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }
  ngOnInit() {

    // Retrieving Locations
    this.locations = Object.assign([], this.appSharedService.locations); // Object.assign used for deep copying of array


    this.heads4 = [
      { 'name': 'Seed Lot Number', 'icon': 'down' },
      { 'name': 'Finished Trays', 'icon': 'down' },
      { 'name': 'Locator Number', 'icon': 'down' },
      { 'name': 'House#/Bay#', 'icon': 'down' },
    ];
    this.appSharedService.sendUserRelatedInfo().subscribe(
      res => { },
      err => console.log(err)
    );
  }

  openDialog(currentItem): void {
    const dialogRef = this.dialog.open(IconDialogComponent, {
      data: currentItem,
    });
  }

  addShipToLoc(event, newlocation) {
    this.locationNames.push(newlocation);
    this.locations.splice(this.locations.indexOf(newlocation), 1);
    this.totalOfLocation.push(0);
    this.newCity = '';
    this.shipToClicked = false;
    this.trigger.closePanel();
  }

  removeShipToLoc(index) {
    console.log(this.appSharedService.locations);
    this.appSharedService.locations.map((val) => {
      if (val.datastore_id === this.locationNames[index].datastore_id) {
        this.locations.push(val);
      }
    });
    this.locationNames.splice(index, 1);
    this.totalOfLocation.splice(index + 4, 1);
    if (this.disabledColumns[index + 4]) {
      this.appSharedService.shippedNumber--;
      this.disabledColumns.splice(index + 4, 1);
    }
  }

  shipColumn(item) {
    this.disabledColumns[item] = true;
    this.appSharedService.shippedNumber++;
  }
  cancelShip(item) {
    this.disabledColumns[item] = false;
    this.appSharedService.shippedNumber--;
  }

  getTotalOfColumn(key) {
    this.totalOfLocation[key + 4] = this.appSharedService.varietyOptions.reduce(function (a, b) {
      return a + parseInt(b.shipTo.locationValues[key] || 0);
    }, 0);
  }

  enableAutoCompleteSearch() {
    this.shipToClicked = !this.shipToClicked;
  }
}

