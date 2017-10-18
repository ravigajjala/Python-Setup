import { Component, OnInit, Inject } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { User } from '../providers/classes/plantInfo.class';

@Component({
  selector: 'app-manage-green-house',
  templateUrl: './manage-green-house.component.html',
  styleUrls: ['./manage-green-house.component.scss']
})
export class ManageGreenHouseComponent {



  public locationId;
  public locations = [];
  public showEditBox = false;
  public editUserName;
  public editUserEmail;
  public editLocationId;

  constructor(public appSharedService: AppSharedService,
    public dialogRef: MdDialogRef<ManageGreenHouseComponent>,
    @Inject(MD_DIALOG_DATA) public currentUsers: any) { }


  addUser(condition) {
    this.showEditBox = condition;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveUser() {
    const newUser = new User();
    newUser.id = this.currentUsers.length;
    newUser.name = this.editUserName;
    newUser.email = this.editUserEmail;
    newUser.state = this.editLocationId.state;
    newUser.city = this.editLocationId.city;

    this.currentUsers.push(newUser);
    this.showEditBox = false;
    this.clearEditFields();
  }

  clearEditFields() {
    this.editUserName = null;
    this.editUserEmail = null;
    this.editLocationId = null;
  }

  deleteUser(i) {
    this.currentUsers.splice(i, 1);
  }

}
