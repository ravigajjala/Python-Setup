import { Component, OnInit, Inject } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GreenHouseInfo } from '../providers/classes/plantInfo.class';

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
  public editUserName;
  public editUserEmail;
  public editLocationId;

  constructor(public appSharedService: AppSharedService,
    public dialogRef: MatDialogRef<ManageGreenHouseComponent>) { }


  addUser(condition) {
    this.showEditBox = condition;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  clearEditFields() {

  }

}
