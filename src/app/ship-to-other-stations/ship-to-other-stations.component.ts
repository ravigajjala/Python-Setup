import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { IconDialogComponent } from '../icon-dialog/icon-dialog.component';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MdAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-ship-to-other-stations',
  templateUrl: './ship-to-other-stations.component.html',
  styleUrls: ['./ship-to-other-stations.component.scss']
})
export class ShipToOtherStationsComponent implements OnInit {

  constructor(public appSharedService: AppSharedService, private router: Router, public dialog: MdDialog, private zone: NgZone) { }

  public heads4 = [];
  public mergeClickBool = false;
  private isSorted = false;
  public active = 4;
  public disabledColumns = [];
  public totalOfLocation = [, , , ,];
  public locationNames = [];
  public locations = [];
  public showAC = false;
  public newCity = '';
  private shipToClicked: boolean;

  @ViewChild(MdAutocompleteTrigger) trigger;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {

    // Retrieving Locations
    this.locations = this.appSharedService.locations;


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
    this.locationNames.push(newlocation);
    this.locations.splice(newlocation, 1);
    this.totalOfLocation.push(0);
    this.newCity = '';
    this.shipToClicked = false;
    this.trigger.closePanel();
    console.log(this.appSharedService.locations);
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
  }

  shipColumn(item) {
    this.disabledColumns[item] = true;
  }
  cancelShip(item) {
    this.disabledColumns[item] = false;
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

