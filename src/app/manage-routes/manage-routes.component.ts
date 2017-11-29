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
      console.log("printin the location information ......");
      console.log(appSharedService.currentGreenHouseLocation);
      this.greenHouseRoutes = appSharedService.currentGreenHouseLocation.routes;
    }

  editableRow(i, gh) {
    this.isValid = true;
    for (let i = 0; i < this.greenHouseRoutes.length; i++) {
      this.ghEditList[i] = false;
    }
    this.ghEditList[i] = true;
    console.log("edit row...", this.ghEditList);
  }

  addRoute(condition) {
    this.greenHouseRoutes.push({});
    this.editableRow(this.greenHouseRoutes.length - 1, {});
  }


  saveGreenHouse(formCtrl) {
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
          
  deleteRoute(location, i) {
    if (!confirm('Are you sure want to Delete?')) {
      return false;
    }
    const id = location.datastore_id;
    const that = this;
    this.appSharedService.deleteLocation(id).subscribe(
      res => { console.log(res); that.greenHouses.splice(i, 1); },
      err => console.log(err)
    );
  }
}
