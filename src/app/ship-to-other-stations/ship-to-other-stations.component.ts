import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IconDialogComponent } from '../icon-dialog/icon-dialog.component';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatAutocompleteTrigger } from '@angular/material';
import { ShipToInfo } from '../providers/classes/plantInfo.class';
import { PlugToDeliver } from '../providers/classes/plantInfo.class';

import { User, Plant, Location, ShipToLocationInfo } from '../providers/classes/plantInfo.class';

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
    this.getPlugToDeliverData();
    // Retrieving Locations
    this.locations = Object.assign([], this.appSharedService.locations); // Object.assign used for deep copying of array
    // Removing current greenhouse location from the ship to locations dropdown
    this.locations = this.locations.filter(locationObj => {
      return locationObj.city !== this.appSharedService.currentGreenHouseLocation.city &&
        locationObj.state !== this.appSharedService.currentGreenHouseLocation.state;
    });
    // Removing selected ship to locations from the ship to locations dropdown
    this.appSharedService.currentGreenHouseLocation.shipToLocations.forEach((shipToObj, i) => {
      this.locations = this.locations.filter(locationObj => {
        return locationObj.city.trim() !== shipToObj.city.trim() && locationObj.state.trim() !== shipToObj.state.trim();
      });
    });
    this.locations.sort();

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


  /**
     * [Invoking when user selects a location from the location dropdown]
     * [It removes the selected location from the dropdown first]
     * [Then it pushes the selected location into currentGreenHouseLocation.shipToLocations]
     * [Also it creates new shipTo obj in varieties]
     */
  addShipToLoc(event: Event, location, index: number): void {
    const newlocation: ShipToLocationInfo = {
      city: location.city,
      state: location.state,
      firstName: location.first_name,
      lastName: location.last_name,
      userEmail: location.email,
      locatorNumber: location.locatorNumber,
      totalShipToQuantities: 0
    };
    // TODO:: Removing location from the dropdown
    this.locations.splice(index, 1);
    this.appSharedService.currentGreenHouseLocation.shipToLocations.push(newlocation);
    this.appSharedService.varietyOptions.forEach(obj => {
      // Creating new shipToObj
      const shipToObj = {
        city: newlocation.city,
        state: newlocation.state,
        disableInput: false,
        qty: null
      };
      obj.shipToInfo.push(shipToObj);

      this.shipToClicked = false;
      this.appSharedService.updatePlugToDeliverData(obj).subscribe(
        res => { },
        err => console.log(err)
      );
    });
    this.appSharedService.updateLocation(this.appSharedService.currentGreenHouseLocation)
      .subscribe(
      res => { },
      err => console.log(err)
      );

      this.newCity = '';
  }

  // Removing location from current location shipTo array
  removeShipToLoc(location: string, index: number): void {
    this.locations.push(location);
    this.locations.sort();
    this.appSharedService.currentGreenHouseLocation.shipToLocations.splice(index, 1);
    this.appSharedService.updateLocation(this.appSharedService.currentGreenHouseLocation)
      .subscribe(res => {
        this.appSharedService.varietyOptions.forEach(obj => {
          obj.shipToInfo.splice(index, 1);
          this.appSharedService.updatePlugToDeliverData(obj).subscribe(
            response => console.log(response),
            err => console.log(err)
          );
        });
      },
      err => console.log(err)
      );
  }

  shipColumn(location: Location, index: number): void {
    this.appSharedService.varietyOptions.forEach(
      varietyObj => {
        if (varietyObj.shipToInfo[index] !== undefined && varietyObj.shipToInfo[index].qty > 0) {
          varietyObj = Object.assign({}, varietyObj);
          varietyObj.userGreenHouseLocation = `${location.city}, ${location.state}`;
          varietyObj.docIdOfParentVariety = varietyObj.datastore_id;
          varietyObj.receivingInfo.quantity = varietyObj.shipToInfo[index].qty;
          varietyObj.showReceiveButton = true;
          varietyObj.receivedInfoFromOtherStations = true;
          varietyObj.receivedButonClicked = false;
          varietyObj.shipToInfo[index].locatorNumber = `${location.locatorNumber}-${varietyObj.weekNumber}`;
          varietyObj.receivingInfo.receivedFromLocation = this.appSharedService.currentGreenHouseLocation.city + ', ' +
            this.appSharedService.currentGreenHouseLocation.state;
          this.appSharedService.createPlugToDeliverData(varietyObj).subscribe(
            res => console.log(res),
            err => console.log(err)
          );
        }
      }
    );
  }

  /**
  * [Retriving all plugToDeliver objects from plugToDeliver Kind]
  * @return it returns all varities from plugToDeliver Kind
  */
  // TODO:: Make shared function
  getPlugToDeliverData() {
    return this.appSharedService.getPlugToDeliverData().subscribe(
      res => {
        this.appSharedService.varietyOptions = res;
      },
      err => {
        console.log('Plug to deliver data retrive error');
      }
    );
  }

  getTotalOfColumn(locationName: string) {
    this.appSharedService.varietyOptions.reduce(function (a, b) {
      return a + Number(b.shipToInfo[locationName] || 0);
    }, 0);
  }

  enableAutoCompleteSearch(): void {
    this.newCity = '';
    this.shipToClicked = !this.shipToClicked;
  }

  /**
   * [Updates plugToDeliver object to plugToDeliver Kind]
   * @param  {PlugToDeliver}   plugToDeliverData [plugToDeliver object sending from when user input value change]
   */
  // TODO:: Make shared function
  updatePlugToDeliverData(plugToDeliverData: PlugToDeliver, index: number): any {
    // TODO:: Sum up the quantities
    this.appSharedService.currentGreenHouseLocation.shipToLocations[index].totalShipToQuantities = 0;
    this.appSharedService.varietyOptions.forEach(variety => {
      if (variety.shipToInfo[index].qty && variety.shipToInfo[index].qty > 0) {
        this.appSharedService.currentGreenHouseLocation.shipToLocations[index].totalShipToQuantities = variety.shipToInfo[index].qty +
          this.appSharedService.currentGreenHouseLocation.shipToLocations[index].totalShipToQuantities;
      }
    });
    this.appSharedService.updatePlugToDeliverData(plugToDeliverData)
      .subscribe(res => {
        this.appSharedService.updateLocation(this.appSharedService.currentGreenHouseLocation).subscribe(
          response => { },
          updateLocationError => console.log(updateLocationError)
        );
      },
      updatePlugTOdeliverError => {
        console.log('Update error');
      });
  }

  // inputErrorCheck(location: string, index: number): boolean {
  //   let disable = false;
  //   if (this.appSharedService.varietyOptions && this.appSharedService.varietyOptions.length > 0) {
  //     for (const variety of this.appSharedService.varietyOptions) {
  //       if (variety.shipToInfo[index].qty && variety.shipToInfo[index].qty > 0 &&
  //         variety.shipToInfo[index].qty > variety.plantingInfo.finishedTrays) {
  //         disable = true;
  //         break;
  //       }
  //     }
  //   }
  //   return disable;
  // }
}

