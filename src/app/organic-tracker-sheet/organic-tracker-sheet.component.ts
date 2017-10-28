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
      // resp => {
        this.appSharedService.getLocations().subscribe(
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
      // }
    // );
  }

  moveToNextStage(stage: string): void {
    if(stage){
      this.appSharedService.varietyOptions.forEach((val, index) => {
        let current_status: boolean = false; 

        for (const key in val.plugTray) {
          if (val.plugTray.hasOwnProperty(key)) {
            if (!val.plugTray[key]) {
              current_status = false;
              break;
            } else {
              current_status= true;
            }
          }
        }


        if(current_status){
          val.type = stage;
          this.appSharedService.updatePlugToDeliverData(val).subscribe(res => {
        
          },
          err => {
            console.log('Create error');
          });
        }
        
      });
    }
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
    this.appSharedService.routesToShow = this.appSharedService.currentGreenHouseLocation.routes;
    this.appSharedService.updateRouteTotal();
    this.appSharedService.getPlugToDeliverData().subscribe(
      res => {
        this.appSharedService.varietyOptions = res;
      },
      err => console.log(err)
    );
  }
}


