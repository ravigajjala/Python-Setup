import { Component, OnInit, Inject } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Plant } from '../providers/classes/plantInfo.class';

@Component({
  selector: 'app-manage-plug-catalog',
  templateUrl: './manage-plug-catalog.component.html',
  styleUrls: ['./manage-plug-catalog.component.scss']
})
export class ManagePlugCatalogComponent {


  public currentPlugs = [];
  public newPlug: Plant;
  public locationId;
  public locations = [];
  public showEditBox = false;
  public editUserName;
  public editUserEmail;
  public editLocationId;

  constructor(public appSharedService: AppSharedService,
    public dialogRef: MdDialogRef<ManagePlugCatalogComponent>) { }


  addUser(condition) {
    this.showEditBox = condition;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  clearEditFields() {

  }

}
