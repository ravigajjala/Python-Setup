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

  constructor(public appSharedService: AppSharedService,
    public dialogRef: MatDialogRef<ManageGreenHouseComponent>) {
    this.greenHouses = Object.assign([], this.appSharedService.locations);
    for (let i = 0; i < this.greenHouses.length; i++) {
      this.ghEditList[i] = false;
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
    this.editableRow(this.greenHouses.length-1, {});
  }

  validateLocation() {
    if (this.gh.firstName && this.gh.lastName && this.gh.state && this.gh.email
      && this.gh.email && this.gh.locatorNumber) {
      this.isValid = true;
    }
  }

  saveGreenHouse(formCtrl) {
    if(!formCtrl.form.valid){
      return false;
    }
    // post API call here
    // this.appSharedService.ghLocationsData = this.greenHouses;
    // this.appSharedService.addLocation().subscribe(
    //   houseData => {
    //     console.log(houseData);
    this.appSharedService.locations = Object.assign([], this.greenHouses); // use object.assign for deep copying
    this.ghEditList = this.ghEditList.map(val => {
      val = false;
    });
    //   },
    //   err => console.log(err)
    // );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteGreenHouse(i) {
    if(!confirm("Are you sure want to Delete?")){
      return false;
    }
    this.greenHouses.splice(i, 1);
    //   this.appSharedService.addLocation(this.greenHouses).subscribe(
    //     houseData => {
    //       console.log(houseData);
    //       this.appSharedService.locations = Object.assign([], this.greenHouses); // use object.assign for deep copying
    //     },
    //     err => console.log(err)
    //   );
  }

}
