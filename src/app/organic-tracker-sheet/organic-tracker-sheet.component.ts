import { DUMMY_DATA1, DUMMY_DATA2 } from './../dummy';
import { Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from '../login/login.service';
import {FormControl} from '@angular/forms';
import {CommonDataService} from '../providers/services/common-data.service';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {ApiService} from '../providers/services/api.service';
import {ManageUsersComponent} from '../manage-users/manage-users.component';
import {ManageGreenHouseComponent} from '../manage-green-house/manage-green-house.component';
import {ManagePlugCatalogComponent} from '../manage-plug-catalog/manage-plug-catalog.component';
import { PlantInfo, PlugTrayInfo, PlantingInfo, ReceivingInfo, SalableInfo, AppStoreDelivery, ShipToInfo } from './../providers/classes/plantInfo.class';

import { Router } from '@angular/router';


import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-organic-tracker-sheet',
  templateUrl: './organic-tracker-sheet.component.html',
  styleUrls: ['./organic-tracker-sheet.component.scss'],
  providers: [LoginService]
})
export class OrganicTrackerSheetComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    private sz: DomSanitizer,
    private commonData: CommonDataService,
    private apiService: ApiService,
    public dialog: MdDialog,
    public router:Router
  ) {

    this.myControl = new FormControl();
    let i = 0;
    this.data2 = DUMMY_DATA1.map((d,index) => {
      //create each plantInfo Object
      this.commonData.plantList[index] = new PlantInfo();
      this.commonData.plantList[index].name = d.name;
      this.commonData.plantList[index].id = d.id;
      this.commonData.plantList[index].icon = d.icon;
      this.commonData.plantList[index].plugTray = new PlugTrayInfo();
      this.commonData.plantList[index].plantingInfo = new PlantingInfo();
      this.commonData.plantList[index].receivingData = new ReceivingInfo();
      this.commonData.plantList[index].totalSalable = new SalableInfo();
      this.commonData.plantList[index].storeDeliveryData = new AppStoreDelivery();
      this.commonData.plantList[index].shipToData = new ShipToInfo();
      this.commonData.plantList[index].shipToData.locationValues = [];
      this.commonData.plantList[index].storeDeliveryData.routeNumberSale =[];
      this.commonData.plantList[index]['nameHtml'] = sz.bypassSecurityTrustHtml(
        `<svg class="icon st${i}"><use xlink:href="../../assets/sprites/icon-sprite-sheet.svg#${d.icon}"/></svg>`
      );
      i < 9 ? i++ : i = 0;

      this.commonData.plantList[index]['shipped'] = false;
      return this.commonData.plantList[index];
    });
  }

  public title = 'Bonnie App';
  public locationId = '';
  public locations = [];
  public data1 = DUMMY_DATA1;
  public data2 = DUMMY_DATA1;
  public optionsData = [];
  public myControl: FormControl;
  public active = 0;
  public options1 = DUMMY_DATA2;



  updateStage(value){
    if(this.active!=value){
      this.active = value;
      this.commonData.setStage(value);
      console.log('satge updated to' + this.commonData.getStage());
      this.router.navigate(["/app-organic-tracker-sheet/"+(this.commonData.getStageUrls())[value-1]]);
    }
  }

  ngOnInit() {

    this.apiService.getLocations().subscribe(
      res => {
        this.locations = res;
      },
      err => {
         console.error('Error occured while retrieving locations');
         this.locations = [
            {id: 1, city: 'Milton', state:' WI'},
            {id: 2, city: 'Houston', state:' TX'},
          ];
      }
    );
  }

  openManageUserDialog(currentUsers): void {
    let dialogRef = this.dialog.open(ManageUsersComponent, {
      data: currentUsers,
    });
  }

  openManageGreenHouseDialog(currentGreenHouse): void {
    let dialogRef = this.dialog.open(ManageGreenHouseComponent, {
      data: currentGreenHouse,
    });
  }

  openManagePlugCatalogDialog(currentPlugCatalog): void {
    let dialogRef = this.dialog.open(ManagePlugCatalogComponent, {
      data: currentPlugCatalog,
    });
  }
  
}


