import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { LoginService } from '../login/login.service';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { ManageGreenHouseComponent } from '../manage-green-house/manage-green-house.component';
import { ManagePlugCatalogComponent } from '../manage-plug-catalog/manage-plug-catalog.component';
import { User, Plant, Location } from '../providers/classes/plantInfo.class';

@Component({
  selector: 'app-organic-tracker-sheet',
  templateUrl: './organic-tracker-sheet.component.html',
  styleUrls: ['./organic-tracker-sheet.component.scss'],
  providers: [LoginService]
})
export class OrganicTrackerSheetComponent implements OnInit {
  public title = 'Bonnie App';
  public locations = [];

  constructor(
    public loginService: LoginService,
    private appSharedService: AppSharedService,
    public dialog: MatDialog,
    public router: Router
  ) {
  }

  ngOnInit() {
    // this.appSharedService.addLocation().subscribe(
    //   res=> {console.log(res)},
    //   error=> {console.log(error)}
    // );
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

  openManageUserDialog(): void {
    const dialogRef = this.dialog.open(ManageUsersComponent, {});
  }

  openManageGreenHouseDialog(): void {
    const dialogRef = this.dialog.open(ManageGreenHouseComponent, {});
  }

  openManagePlugCatalogDialog(): void {
    const dialogRef = this.dialog.open(ManagePlugCatalogComponent, {});
  }

  /**
  * [When user chnages the green house location from the dropdown this function will update the plug to deliver data]
  */
  locationChange(): void {
    this.appSharedService.getPlugToDeliverData().subscribe(
      res => {
        this.appSharedService.varietyOptions = res;
      },
      err => console.log(err)
    );
  }
}


