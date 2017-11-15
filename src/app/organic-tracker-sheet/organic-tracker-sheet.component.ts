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
  private plugNotifStatus = [];
  public message;

  constructor(
    public loginService: LoginService,
    private appSharedService: AppSharedService,
    public dialog: MatDialog,
    public router: Router
  ) {
  }

  ngOnInit() {
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
    this.appSharedService.currentMessage.subscribe(message => this.message = message);
  }

  moveToNextStage(stage: string): void {
    if (stage) {
      this.appSharedService.totalNotif = 0;
      this.plugNotifStatus = [];
      this.appSharedService.varietyOptions.forEach((val, index) => {
        let current_status: boolean = false;

        for (const key in val.plugTray) {
          if (val.plugTray.hasOwnProperty(key)) {
            if ((["reasonsCode"].indexOf(key) === -1 && !val.plugTray[key] && val.plugTray[key] !== 0)
              || (["reasonsCode"].indexOf(key) > -1 && !((val.plugTray.plugFlatsDiscarded === 0 && !val.plugTray.reasonsCode)
                || (val.plugTray.plugFlatsDiscarded !== 0 && !!val.plugTray.reasonsCode)))) {
              current_status = false;
              break;
            } else {
              current_status = true;
            }
          }
        }

        let errCheck = (val.plugTray.plugFlatsPotted > val.plugTray.plugFlatsReceived);
        if (current_status && !errCheck) {
          val.type = stage;
          this.updateNotifStatus(val, index);
          this.appSharedService.updatePlugToDeliverData(val).subscribe(res => {

          },
            err => {
              console.log('Create error');
            });
        }

      });
      //this.updateNotifStatus(this.appSharedService.varietyOptions)
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

  updateNotifStatus(val, index): void {
    const currentStatus = this.plugNotifStatus[index];
    if (val.type === "PLUG") {
      let errCheck = (val.plugTray.plugFlatsPotted > val.plugTray.plugFlatsReceived);
      if (!errCheck) {
        // iterate through each key in object
        for (const key in val.plugTray) {
          if (val.plugTray.hasOwnProperty(key)) {
            if ((["reasonsCode"].indexOf(key) === -1 && !val.plugTray[key] && val.plugTray[key] !== 0)
              || (["reasonsCode"].indexOf(key) > -1 && !((val.plugTray.plugFlatsDiscarded === 0 && !val.plugTray.reasonsCode)
                || (val.plugTray.plugFlatsDiscarded !== 0 && !!val.plugTray.reasonsCode)))) {
              this.plugNotifStatus[index] = false;
              break;
            } else {
              this.plugNotifStatus[index] = true;
            }
          }
        }
      }
      else {
        this.plugNotifStatus[index] = false;
      }

      if (!currentStatus) {
        if (this.plugNotifStatus[index]) {
          this.appSharedService.totalNotif++;
        }
      } else {
        if (!this.plugNotifStatus[index]) {
          this.appSharedService.totalNotif--;
        }
      }
    }
  }
  /**
  * [When user chnages the green house location from the dropdown this function will update the plug to deliver data]
  */
  locationChange(): void {
    this.appSharedService.currentGreenHouseLocation.routes;
    this.appSharedService.updateRouteTotal();
    this.appSharedService.getPlugToDeliverData().subscribe(
      res => {
        this.appSharedService.varietyOptions = res;
        this.appSharedService.totalNotif = 0;
        this.appSharedService.changeMessage('updated_location');
        this.appSharedService.varietyOptions.forEach((val, index) => {
          this.updateNotifStatus(val, index);
        });
      },
      err => console.log(err)
    );
  }
}


