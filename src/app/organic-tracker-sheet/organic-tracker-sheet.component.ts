import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AppSharedService } from '../providers/services/app-shared.service';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {ManageUsersComponent} from '../manage-users/manage-users.component';
import {ManageGreenHouseComponent} from '../manage-green-house/manage-green-house.component';
import {ManagePlugCatalogComponent} from '../manage-plug-catalog/manage-plug-catalog.component';


import { Router } from '@angular/router';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-organic-tracker-sheet',
  templateUrl: './organic-tracker-sheet.component.html',
  styleUrls: ['./organic-tracker-sheet.component.scss'],
  providers: [LoginService]
})
export class OrganicTrackerSheetComponent implements OnInit {
  public title = 'Bonnie App';
  public locationId = '';
  public locations = [];

  constructor(
    public loginService: LoginService,
    private appSharedService: AppSharedService,
    public dialog: MdDialog,
    public router: Router
  ) {
  }

  // Retrieving Location, Users, Plants data
  // Keeping Users and Plants data in shared service
  ngOnInit() {
    this.appSharedService.getUsers().subscribe(
      users => {
        this.appSharedService.users = users;
        this.appSharedService.getPlantVarieties().subscribe(
          plants => {
            this.appSharedService.plants = plants;
            this.appSharedService.getLocations().subscribe(
              locations => {
                this.appSharedService.locations = locations;
                this.locations = locations;
              },
              err => {
                console.log('Unable to retrive green house locations list');
              }
            );
          },
          err => {
            console.log('Unable to retrive green house plants list');
          }
        );
      },
      err => {
        console.log('Unable to retrive green house users list');
      }
    );
  }

  openManageUserDialog(currentUsers): void {
    let dialogRef = this.dialog.open(ManageUsersComponent, {
      data: currentUsers,
    });
  }

  openManageGreenHouseDialog(currentGreenHouse): void {
    let dialogRef = this.dialog.open(ManageGreenHouseComponent, {
      data: currentGreenHouse,
    });
  }

  openManagePlugCatalogDialog(currentPlugCatalog): void {
    let dialogRef = this.dialog.open(ManagePlugCatalogComponent, {
      data: currentPlugCatalog,
    });
  }
}


