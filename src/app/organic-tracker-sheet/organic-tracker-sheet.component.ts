import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { LoginService } from '../login/login.service';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { ManageGreenHouseComponent } from '../manage-green-house/manage-green-house.component';
import { ManageRoutesComponent } from '../manage-routes/manage-routes.component';
import { User, Plant, Location } from '../providers/classes/plantInfo.class';
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
  private plugNotifStatus = [];
  public message;
  private loading: boolean;

  constructor(
    public loginService: LoginService,
    private appSharedService: AppSharedService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.loading = true;
    // // Using accessToken retriving the user data from Auth0
    // const accessToken = localStorage.getItem('access_token');
    // console.log('accesstoken:: ' + accessToken);

    // this.loginService.getProfile(accessToken);
  }

  ngOnInit() {
    // // Retrieving the locations from Locations Kind
    // return this.appSharedService.getLocations().subscribe(
    //   locations => {
    //     this.appSharedService.locations = locations;
    //     const userEmail = this.loginService.userProfile.name;
    //     return this.loginService.getLocationByEmail(userEmail).subscribe(
    //       location => {
    //         this.appSharedService.userId = location[0].email;
    //         // TODO:: Add state too
    //         this.appSharedService.loggedInUserGreenHouseLocation = location[0].city;
    //         this.appSharedService.currentGreenHouseLocation = location[0];
    //         // checking first time login or reoccuring login then routing
    //         return this.appSharedService.getUserPreviousRoute().subscribe(
    //           userInfoArray => {
    //             // TODO:: Make observable filter
    //             let newRoute;
    //             userInfoArray = userInfoArray.filter(response => response.datastore_id === this.appSharedService.userId);
    //             this.loading = false;
    //             if (this.loginService.isAuthenticated() && userInfoArray.length > 0) {
    //               newRoute = userInfoArray[0].lastRoute;
    //               this.router.navigate([newRoute]);
    //             } else {
    //               this.router.navigate(['app-organic-tracker-sheet/app-plug-tray-information']);
    //             }
    //           },
    //           err => console.log(err)
    //         );
    //       },
    //       err => console.log(err)
    //     );
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    // // this.appSharedService.currentMessage.subscribe(message => this.message = message);

    this.appSharedService.getLocations().subscribe(
      locations => {
        this.loading = false;
        this.appSharedService.locations = locations;
        this.appSharedService.userId = 'sai.nani.999@gmail.com';
        this.appSharedService.loggedInUserGreenHouseLocation = 'Pearl';
        this.appSharedService.currentGreenHouseLocation = {
          "code": "67_drop",
          "firstName": "Justin",
          "lastName": "Viles",
          "city": "Gillette",
          "state": " WY",
          "userEmail": "justinviles@hotmail.com",
          "shipToLocations": [],
          "locatorNumber": 0,
          "routes": [94, 95],
          "datastore_id": ''
        };
        // TODO:: check first time login or reoccuring login then route
        this.appSharedService.getUserPreviousRoute().subscribe(
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


  moveToNextStage(stage: string): void {
    if (stage) {
      this.appSharedService.totalNotif = 0;
      this.plugNotifStatus = [];
      this.appSharedService.varietyOptions.forEach((val, index) => {
        let current_status: boolean = false;

        for (const key in val.plugTray) {
          if (val.plugTray.hasOwnProperty(key)) {
            if ((['reasonsCode'].indexOf(key) === -1 && !val.plugTray[key] && val.plugTray[key] !== 0)
              || (['reasonsCode'].indexOf(key) > -1 && !((val.plugTray.plugFlatsDiscarded === 0 && !val.plugTray.reasonsCode)
                || (val.plugTray.plugFlatsDiscarded !== 0 && !!val.plugTray.reasonsCode)))) {
              current_status = false;
              break;
            } else {
              current_status = true;
            }
          }
        }

        const errCheck = (val.plugTray.plugFlatsPotted > val.plugTray.plugFlatsReceived || val.plugTray.plugFlatsDiscarded > val.plugTray.plugFlatsReceived);
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

  openManageRoutesDialog(): void {
    const dialogRef = this.dialog.open(ManageRoutesComponent, {});
  }

  updateNotifStatus(val, index): void {
    const currentStatus = this.plugNotifStatus[index];
    if (val.type === 'PLUG') {
      const errCheck = (val.plugTray.plugFlatsPotted > val.plugTray.plugFlatsReceived || val.plugTray.plugFlatsDiscarded > val.plugTray.plugFlatsReceived);
      if (!errCheck) {
        // iterate through each key in object
        for (const key in val.plugTray) {
          if (val.plugTray.hasOwnProperty(key)) {
            if ((['reasonsCode'].indexOf(key) === -1 && !val.plugTray[key] && val.plugTray[key] !== 0)
              || (['reasonsCode'].indexOf(key) > -1 && !((val.plugTray.plugFlatsDiscarded === 0 && !val.plugTray.reasonsCode)
                || (val.plugTray.plugFlatsDiscarded !== 0 && !!val.plugTray.reasonsCode)))) {
              this.plugNotifStatus[index] = false;
              break;
            } else {
              this.plugNotifStatus[index] = true;
            }
          }
        }
      } else {
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
  locationChange(location): void {
    this.appSharedService.currentGreenHouseLocation = location;
    console.log(this.appSharedService.currentGreenHouseLocation);
    // this.appSharedService.updateRouteTotal();
    this.appSharedService.getPlugToDeliverData().subscribe(
      res => {
        this.appSharedService.varietyOptions = res;
        this.appSharedService.totalNotif = 0;
        this.appSharedService.changeMessage('updated_location');
      },
      err => console.log(err)
    );
  }
}


