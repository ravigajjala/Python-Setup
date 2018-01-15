import { Component, OnInit, Inject } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from '../providers/classes/plantInfo.class';

@Component({
  selector: 'app-manage-routes',
  templateUrl: './manage-routes.component.html',
  styleUrls: ['./manage-routes.component.scss']
})
export class ManageRoutesComponent {


  public currentGreenHouses = [];
  public locationId;
  public locations = [];
  public greenHouses = [];
  public showEditBox = false;
  public editRoutes;
  public editNickName;
  public ghEditList = [];
  private isValid = false;
  public gh = {
    routes: null
  };
public greenHouseRoutes = [];

  constructor(public appSharedService: AppSharedService,
    public dialogRef: MatDialogRef<ManageRoutesComponent>) { 
      this.greenHouseRoutes = appSharedService.currentGreenHouseLocation.routes;
      let len = this.greenHouseRoutes.length;
      if( len > 0 &&  Object.keys(this.greenHouseRoutes[len-1]).length == 0){
        this.greenHouseRoutes.splice(len-1, 1);
      }
    }

  editableRow(i, gh) {
    this.isValid = true;
    for (let i = 0; i < this.greenHouseRoutes.length; i++) {
      this.ghEditList[i] = false;
    }
    this.ghEditList[i] = true;
  }

  addRoute(condition) {
    this.appSharedService.changeMessage('add_route');
    this.greenHouseRoutes.push({});
    this.editableRow(this.greenHouseRoutes.length - 1, {});
  }


  saveRoute(formCtrl) {
    if(!formCtrl.form.valid){
      return false;
    }

    this.appSharedService.currentGreenHouseLocation.routes = this.greenHouseRoutes;
    //this.appSharedService.locations = Object.assign([], this.greenHouses); // use object.assign for deep copying
    this.appSharedService.updateLocation(this.appSharedService.currentGreenHouseLocation).subscribe(
      res => {console.log(res);},
      err => console.log(err)
    );
    
    this.ghEditList = this.ghEditList.map(val => {
      val = false;
    });
  }
    closeDialog(): void {
    this.dialogRef.close();
  }
          
  deleteRoute(i,location) {
    if (!confirm('Are you sure want to Delete?')) {
      return false;
    }
    this.greenHouseRoutes.splice(i,1);
    this.appSharedService.currentGreenHouseLocation.routes = this.greenHouseRoutes;
    this.appSharedService.updateLocation(this.appSharedService.currentGreenHouseLocation).subscribe(
      res => {console.log(res);},
      err => console.log(err)
    );
  }
}
