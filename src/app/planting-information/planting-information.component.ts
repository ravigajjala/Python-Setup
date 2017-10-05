import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Plant } from './plant';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {IconDialogComponent} from '../icon-dialog/icon-dialog.component';
import {CommonDataService} from '../providers/services/common-data.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-planting-information',
  templateUrl: './planting-information.component.html',
  styleUrls: ['./planting-information.component.scss']
})




export class PlantingInformationComponent implements OnInit {

  public heads2 = [];
  public mergeClickBool = false;
  private isSorted = false;
  public active = 2;
  public filteredOptions: Observable<any[]>;
  public totalFlatsToSale = 0;
  public plantingInfoForm: FormGroup;



  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public commonData : CommonDataService,
    public dialog: MdDialog,
    public router: Router
  ) {}


  ngOnInit() {

    if(this.commonData.getStage()==0){
      this.router.navigate(["/"]);
    }else{
      console.error('Something went wrong with routing/redirecting');
    }

    this.heads2 = [
      'Seed Lot Number',
      'Plug Flats Plotted',
      'Finished Trays',
      'Locator Number',
      'Potted Date',
      'House#/Bay#'
    ];

    this.totalFlatsToSale = this.getTotalOfColumn(this.commonData.plantData,'pfd');

    this.plantingInfoForm = new FormGroup({
      datePotted: new FormControl(null, Validators.required)
    });  
  }


  

  getTotalOfColumn(array,key){
    let total = array.reduce(function(a,b){
      return a + b[key]
    },0);
    return total;
  }
  
  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  

  openDialog(currentItem): void {
    let dialogRef = this.dialog.open(IconDialogComponent, {
      data: currentItem,
    });
  }

  sort() {
    if ( !this.isSorted ) {
      this.commonData.plantData = this.commonData.plantData.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
      this.isSorted = true;
    }
    this.commonData.plantData = this.commonData.plantData.reverse();
  }

}
