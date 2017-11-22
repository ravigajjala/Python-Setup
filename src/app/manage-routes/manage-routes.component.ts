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


  constructor(public appSharedService: AppSharedService,
    public dialogRef: MatDialogRef<ManageRoutesComponent>) { }

  editableRow(i, gh) {
    this.isValid = true;
    for (let i = 0; i < this.greenHouses.length; i++) {
      this.ghEditList[i] = false;
    }
    this.ghEditList[i] = true;
    console.log("edit row...", this.ghEditList);
  }

  addRoute(condition) {
    this.greenHouses.push(new Location());
    this.editableRow(this.greenHouses.length - 1, {});
  }


  saveGreenHouse(formCtrl) {
    if(!formCtrl.form.valid){
      return false;
    }
    this.appSharedService.locations = Object.assign([], this.greenHouses); // use object.assign for deep copying
    this.ghEditList = this.ghEditList.map(val => {
      val = false;
    });
  }



  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteRoute(i) {
    if (!confirm("Are you sure want to Delete?")) {
      return false;
    }
    this.greenHouses.splice(i, 1);

  }
}
