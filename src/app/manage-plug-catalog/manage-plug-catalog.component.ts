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
    this.getPlantVarieties();
  }

  getPlantVarieties() {
    this.appSharedService.getPlantVarieties().subscribe(
      plants => {
        console.log(plants);
        this.appSharedService.plants = plants;
        this.greenHouses = Object.assign([], this.appSharedService.plants);
      });
  }

  editableRow(index, gh) {
    this.isValid = true;
    for (let i = 0; i < this.appSharedService.plants.length; i++) {
      this.ghEditList[i] = false;
    }
    this.ghEditList[index] = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addVariety() {
    let newV = {
      "name": null,
      "icon": "basil",
      "color_id": "st1",
      "url": "dist/assets/sprites/icon-sprite-sheet.svg#basil",
      "varietyType": "basil",
      "organic": null,
      "id": null
    };
    this.appSharedService.plants.push(newV);
    this.editableRow(this.appSharedService.plants.length - 1, {});
    this.isAddFlag[this.appSharedService.plants.length - 1] = true;

  }

  updateVariety() {
  }

  deleteVariety(plants, i) {
    if (!confirm('Are you sure want to Delete?')) {
      return false;
    }
    const id = plants.datastore_id;
    const that = this;
    this.appSharedService.deletePlant(id).subscribe(
      res => { console.log(res); that.appSharedService.plants.splice(i, 1); this.appSharedService.plants.splice(i,1);},
      err => console.log(err)
    );
  }
}
