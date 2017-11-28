import { Component, OnInit, Inject } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from '../providers/classes/plantInfo.class';

@Component({
  selector: 'app-manage-green-house',
  templateUrl: './manage-green-house.component.html',
  styleUrls: ['./manage-green-house.component.scss']
})
export class ManageGreenHouseComponent {


  public currentGreenHouses = [];
  public locationId;
  public locations = [];
  public greenHouses = [];
  public showEditBox = false;
  public editFirstName;
  public editLastName;
  public editUserEmail;
  public editLocation;
  public editLocatorNumber;
  public ghEditList = [];
  private isValid = false;
  public gh = {
    firstName: null,
    lastName: null,
    city: null,
    state: null,
    email: null,
    locatorNumber: null
  };
  public isAddFlag = [];

  constructor(public appSharedService: AppSharedService,
    public dialogRef: MatDialogRef<ManageGreenHouseComponent>) {
    this.greenHouses = Object.assign([], this.appSharedService.locations);
    for (let i = 0; i < this.greenHouses.length; i++) {
      this.ghEditList[i] = false;
      this.isAddFlag[i] = false;
    }
  }

  editableRow(i, gh) {
    this.isValid = true;
    for (let i = 0; i < this.greenHouses.length; i++) {
      this.ghEditList[i] = false;
    }
    this.ghEditList[i] = true;
    console.log("edit row...", this.ghEditList);
  }

  addGreenHouse(condition) {
    this.greenHouses.push(new Location());
    this.editableRow(this.greenHouses.length - 1, {});  
    this.isAddFlag[this.greenHouses.length - 1] = true;
    
  }

  validateLocation() {
    if (this.gh.firstName && this.gh.lastName && this.gh.state && this.gh.email
      && this.gh.email && this.gh.locatorNumber) {
      this.isValid = true;
    }
  }

  saveGreenHouse(formCtrl, location) {
    if (!formCtrl.form.valid) {
      return false;
    }
    console.log(location);
    location.shipToLocations = [];
    this.appSharedService.addLocation(location).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  updateGreenHouse(formCtrl, location,i) {
    if (!formCtrl.form.valid) {
      return false;
    }
    console.log("adding new is : " + this.isAddFlag[i]);

    if(this.isAddFlag[i]){
      location.shipToLocations = [];
      this.appSharedService.addLocation(location).subscribe(
        res => {console.log(res); this.ghEditList[i]=false; this.isAddFlag[i]= false},
        err => console.log(err)
      );
    }
    else {
      this.appSharedService.updateLocation(location).subscribe(
        res => {console.log(res); this.ghEditList[i]=false;},
        err => console.log(err)
      );
    }  
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteGreenHouse(location,i) {
    if (!confirm('Are you sure want to Delete?')) {
      return false;
    }
    const id = location.datastore_id;
    const that = this;
    this.appSharedService.deleteLocation(id).subscribe(
      res => { console.log(res); that.greenHouses.splice(i,1);},
      err => console.log(err)
    );
  }
}
