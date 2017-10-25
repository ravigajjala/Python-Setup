import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { ManageGreenHouseComponent } from '../manage-green-house/manage-green-house.component';
import { ManagePlugCatalogComponent } from '../manage-plug-catalog/manage-plug-catalog.component';
import { User, Plant, Location } from '../providers/classes/plantInfo.class';


import { Router, NavigationEnd } from '@angular/router';

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
    public dialog: MatDialog,
    public router: Router
  ) {
  }

  ngOnInit() {

    this.appSharedService.addPlants().subscribe(
      plants => {},
      err => {
        console.log('Unable to retrive green house plants list');
      }
    );
    
    return this.appSharedService.getLocations().subscribe(
      locations => {
        this.appSharedService.locations = locations;
        // TODO:: check first time login or reoccuring login then route
        this.appSharedService.getUserPreviousRoute(this.appSharedService.userId).subscribe(
          userInfoArray => {
            // TODO:: Make observable filter
            let newRoute;
            userInfoArray = userInfoArray.filter(response => response.datastore_id === this.appSharedService.userId);
            if (userInfoArray.length > 0) {
              newRoute = userInfoArray[0].lastRoute;
              this.router.navigate([newRoute]);
            }
          },
          err => console.log(err)
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  openManageUserDialog(currentUsers: User): void {
    const dialogRef = this.dialog.open(ManageUsersComponent, {
      data: currentUsers,
    });
  }

  openManageGreenHouseDialog(currentGreenHouse: Location): void {
    const dialogRef = this.dialog.open(ManageGreenHouseComponent, {
      data: currentGreenHouse,
    });
  }

  openManagePlugCatalogDialog(currentPlugCatalog: Plant): void {
    const dialogRef = this.dialog.open(ManagePlugCatalogComponent, {
      data: currentPlugCatalog,
    });
  }
}


