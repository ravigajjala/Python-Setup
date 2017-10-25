import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IconDialogComponent } from '../icon-dialog/icon-dialog.component';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatAutocompleteTrigger } from '@angular/material';
import { ShipToInfo } from '../providers/classes/plantInfo.class';
import { PlugToDeliver } from '../providers/classes/plantInfo.class';

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
  public totalOfLocation = [, , , ,];
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

  addShipToLoc(event, newlocation): void {
    const locationName = newlocation.city + ', ' + newlocation.state;
    this.appSharedService.currentGreenHouseLocation.shipToLocations.push(locationName);
    // const totalQtyObj = { locationName: undefined };
    // this.appSharedService.currentGreenHouseLocation.shipToTotalQty.push(totalQtyObj);
    this.appSharedService.updateLocation(this.appSharedService.currentGreenHouseLocation)
      .subscribe(
      res => this.appSharedService.getLocations().subscribe(
        locations => this.appSharedService.locations = locations,
        err => console.log(err)
      ),
      err => console.log(err)
      );
    this.locations.splice(this.locations.indexOf(newlocation), 1);
    this.trigger.closePanel();
    this.appSharedService.varietyOptions.forEach(obj => {
      obj.shipToInfo[locationName] = 0;
      this.appSharedService.updatePlugToDeliverData(obj).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    });
  }

  removeShipToLoc(locationName: string, index: number): void {
    this.appSharedService.currentGreenHouseLocation.shipToLocations.splice(index, 1);

    this.appSharedService.updateLocation(this.appSharedService.currentGreenHouseLocation)
      .subscribe(
      res => this.appSharedService.getLocations().subscribe(
        locations => this.appSharedService.locations = locations,
        err => console.log(err)
      ),
      err => console.log(err)
      );

    this.appSharedService.varietyOptions.forEach(obj => {
      delete obj.shipToInfo[locationName];
      this.appSharedService.updatePlugToDeliverData(obj).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    });
  }

  shipColumn(locationName: string, event): void {
    this.appSharedService.varietyOptions.forEach(
      varietyObj => {
        if (varietyObj.shipToInfo[locationName] !== undefined && varietyObj.shipToInfo[locationName] > 0) {
          varietyObj.userGreenHouseLocation = locationName;
          varietyObj.receivingInfo.quantity = varietyObj.shipToInfo[locationName];
          varietyObj.receivingInfo.showReceiveButton = true;
          varietyObj.receivingInfo.receivedInfoFromOtherStations = true;
          varietyObj.receivedInfo.receivedFromLocation = this.appSharedService.currentGreenHouseLocation.city + ', ' +
            this.appSharedService.currentGreenHouseLocation.state;
          this.appSharedService.createPlugToDeliverData(varietyObj).subscribe(
            res => console.log(res),
            err => console.log(err)
          );
        }
      }
    );
  }

  cancelShip(item) {
    this.disabledColumns[item] = false;
    this.appSharedService.shippedNumber--;
  }

  getTotalOfColumn(locationName: string) {
    this.appSharedService.currentGreenHouseLocation.shipToTotalQty[locationName] =
      this.appSharedService.varietyOptions.reduce(function (a, b) {
        return a + Number(b.shipToInfo[locationName] || 0);
      }, 0);
  }

  enableAutoCompleteSearch(): void {
    this.shipToClicked = !this.shipToClicked;
  }

  /**
   * [Updates plugToDeliver object to plugToDeliver Kind]
   * @param  {PlugToDeliver}   plugToDeliverData [plugToDeliver object sending from when user input value change]
   */
  // TODO:: Make shared function
  updatePlugToDeliverData(plugToDeliverData: PlugToDeliver): any {
    this.appSharedService.updatePlugToDeliverData(plugToDeliverData)
      .subscribe(res => { },
      err => {
        console.log('Update error');
      });
  }
}

