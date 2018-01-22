import { Component, OnInit, Inject } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Plant } from '../providers/classes/plantInfo.class';

@Component({
  selector: 'app-manage-plug-catalog',
  templateUrl: './manage-plug-catalog.component.html',
  styleUrls: ['./manage-plug-catalog.component.scss']
})
export class ManagePlugCatalogComponent {

  public currentGreenHouses = [];
  
  public currentPlugs = [];
  public newPlug: Plant;
  public locationId;
  public locations = [];
  public greenHouses = [];
  public showEditBox = false;
  public editName;
  public editIcon;
  public editColor_ID;
  public editUrl;
  public editVarietyType;
  public ghEditList = [];
  private isValid = false;
  public isAddFlag = [];

  constructor(public appSharedService: AppSharedService,
    public dialogRef: MatDialogRef<ManagePlugCatalogComponent>) { 
      this.greenHouses = Object.assign([], this.appSharedService.locations);
    for (let i = 0; i < this.greenHouses.length; i++) {
      this.ghEditList[i] = false;
      this.isAddFlag[i] = false;
    }
    }

  getPlants() {
    this.appSharedService.getPlantVarieties().subscribe(
      plants => {
        this.appSharedService.plants = plants;
        this.greenHouses = Object.assign([], this.appSharedService.plants);
      });
  }

  editableRow(index, gh) {
    this.isValid = true;
    for (let i = 0; i < this.greenHouses.length; i++) {
      this.ghEditList[i] = false;
    }
    this.ghEditList[index] = true;
  }

  addPlant(condition) {

    this.greenHouses.push(new Plant());
    this.editableRow(this.greenHouses.length - 1, {});
    this.isAddFlag[this.greenHouses.length - 1] = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  deletePlant(plant, i) {
  }
}
