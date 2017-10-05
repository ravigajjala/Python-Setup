import { DUMMY_DATA1, DUMMY_DATA2 } from './../dummy';
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef,Inject, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA, MdAutocompleteTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {IconDialogComponent} from '../icon-dialog/icon-dialog.component';
import {CommonDataService} from '../providers/services/common-data.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-plug-tray-information',
  templateUrl: './plug-tray-information.component.html',
  styleUrls: ['./plug-tray-information.component.scss']
})
export class PlugTrayInformationComponent implements OnInit, AfterViewInit {

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public dialog: MdDialog,
    public commonData: CommonDataService,
    public router:Router
  ) { 

    this.myControl = new FormControl();
    this.varietyControl = new FormControl();
    let i = 0;
    i = 0;
    this.optionsData = Object.assign([],this.commonData.plantList);
  }
  public locations = [];
  public list = [];
  public heads = [];
  public optionsData = [];
  public myControl: FormControl;
  public varietyControl: FormControl;
  public mergeClickBool = false;
  private isSorted = false;
  public active = 1;
  public filteredOptions: Observable<any[]>;
  // public totalFlatsToSale = 0;
  public PlugTrayForm: FormGroup;
  public varietyOptions: any[];
  private newPlant: any;

  @ViewChild(MdAutocompleteTrigger) trigger;  //get the autocomplete cancel trigger



  openDialog(currentItem): void {
    let dialogRef = this.dialog.open(IconDialogComponent, {
      data: currentItem,
    });
  }




  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {

    //redirect to parent route on reload
    if(this.commonData.getStage()==0){
      this.router.navigate(["/"]);
    }else{
      console.error('Something went wrong with routing/redirecting');
    }

    this.heads = [
      'Plug Flats Received',
      'Date received',
      'Plug Flats Plotted',
      'Plug Flats Discarded',
      'Reasons Code',
      'Seed Lot Number'
    ];

    

    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filterAddPlant(val) : this.optionsData.slice());

    this.varietyControl.valueChanges
      .subscribe(
        val=> {
          setTimeout(() => {this.varietyOptions = val ? this.filterVariety(val) : this.commonData.plantData}, 0);
      });



    this.PlugTrayForm = new FormGroup({
      dateReceived: new FormControl(null, Validators.required)
    });

    // this.totalFlatsToSale = this.commonData.getTotalOfColumn(this.commonData.plantData,'pfd');
  }

  sort() {
    if ( !this.isSorted ) {
      this.varietyOptions = this.varietyOptions.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
      this.isSorted = true;
    }
    this.varietyOptions = this.varietyOptions.reverse();
  }

  filter(val: any): any[] {
    return this.optionsData.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }


  displayFn(order): string {
      this.newPlant = {...order};
      return null;
  }

/**
 * [addPlant description]
 */
  addPlant(event,newPlant) {
    if (newPlant) {
        // newPlant = { ...newPlant, id: this.commonData.plantData.length + 1 };
        newPlant.id = this.commonData.plantData.length +1;
        let tempNewPlant = Object.assign({},newPlant);
        tempNewPlant.plugTray = Object.assign({},newPlant.plugTray);
        tempNewPlant.plantingInfo = Object.assign({},newPlant.plantingInfo);
        tempNewPlant.receivingData = Object.assign({},newPlant.receivingData);
        tempNewPlant.totalSalable = Object.assign({},newPlant.totalSalable);
        tempNewPlant.shipToData = Object.assign({},newPlant.shipToData);
        tempNewPlant.shipToData.locationValues = Object.assign([],newPlant.shipToData.locationValues);
        tempNewPlant.storeDeliveryData = Object.assign({},newPlant.storeDeliveryData);
        this.commonData.plantData = [
            ...this.commonData.plantData,
            tempNewPlant
        ];
        this.varietyOptions = [
            ...this.varietyOptions,
            tempNewPlant
        ];
    }
    this.trigger.closePanel();
  }

  ngAfterViewInit() {
    const scrollElement = this.el.nativeElement.querySelector('.right-scroll');
    const theadElement =  this.el.nativeElement.querySelector('table thead');
    if (scrollElement) {
      this.renderer.listen(scrollElement, 'scroll', (evt) => {
      });
    }
  }

  /**
   * [filter values for variety inpiut]
   * @param  {any}   val [user input value]
   */
    filterVariety(val:any):any[] {
      return this.commonData.plantData.filter(option =>
        option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
  

  /**
 * [filter values for add plant autocomplete]
 * @param  {any}   val [user input value]
 */
  filterAddPlant(val: any): any[] {
    if(val && typeof val === 'string'){
      return this.optionsData.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
  }
}


