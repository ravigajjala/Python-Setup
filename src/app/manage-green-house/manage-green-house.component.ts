import { Component, OnInit, Inject } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GreenHouseInfo, Location } from '../providers/classes/plantInfo.class';

@Component({
  selector: 'app-manage-green-house',
  templateUrl: './manage-green-house.component.html',
  styleUrls: ['./manage-green-house.component.scss']
})
export class ManageGreenHouseComponent {


  public currentGreenHouses = [];
  public locationId;
  public locations = [];
  public showEditBox = false;
  public editFirstName;
  public editLastName;
  public editUserEmail;
  public editLocation;
  public editLocatorNumber;

  constructor(public appSharedService: AppSharedService,
    public dialogRef: MatDialogRef<ManageGreenHouseComponent>) { }


  addGreenHouse(condition) {
    this.showEditBox = condition;
  }

  saveGreenHouse() {
    if (this.editFirstName) {
      const newHouse = new Location();
      newHouse.firstName = this.editFirstName;
      newHouse.lastName = this.editLastName;
      newHouse.city = this.editLocation.city;
      newHouse.state = this.editLocation.state;
      newHouse.locatorNumber = this.editLocatorNumber;
      // post API call here
      this.appSharedService.addLocation(newHouse).subscribe(
        houseData => {
          console.log(houseData);
          this.appSharedService.locations.push(newHouse);
          this.clearEditFields();
        },
        err => console.log(err)
      );
    }else {
      console.error('Firstname not present');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  clearEditFields() {
    this.editFirstName = '';
    this.editLastName = '';
    this.editLocation = null;
    this.editLocatorNumber = '';
    this.editUserEmail = '';
    this.showEditBox = false;
  }

  deleteGreenHouse(i) {
    this.appSharedService.locations.splice(i, 1);
  }

}
