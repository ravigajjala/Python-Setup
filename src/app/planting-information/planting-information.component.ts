import { DUMMY_DATA1, DUMMY_DATA2 } from './../dummy';
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PlantingInformationService } from './planting-information.service';
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
  styleUrls: ['./planting-information.component.scss'],
  providers: [PlantingInformationService]
})
export class PlantingInformationComponent implements OnInit, AfterViewInit {
  plants: Plant[];
  constructor(
    private plantingInformationService: PlantingInformationService,
    private renderer: Renderer2,
    private el: ElementRef,
    private sz: DomSanitizer,
    public commonData : CommonDataService,
    public dialog: MdDialog,
    public router: Router
  ) { 
    this.myControl = new FormControl();
    let i = 0;
    this.data1 = this.data2 = DUMMY_DATA1.map(d => {
      d['nameHtml'] = sz.bypassSecurityTrustHtml(
        `<svg class="icon st${i}"><use xlink:href="../../assets/sprites/icon-sprite-sheet.svg#${d.icon}"/></svg>${d.name}`
      );
      i < 9 ? i++ : i = 0;

      d['shipped'] = false;
      return d;
    });
    i = 0;
    this.optionsData = DUMMY_DATA1.map(d => {
        d['nameHtml'] = sz.bypassSecurityTrustHtml(
            `<svg class="icon st${i}"><use xlink:href="../../assets/sprites/icon-sprite-sheet.svg#${d.icon}"/></svg>`
        );
        i < 9 ? i++ : i = 0;
        return d;
    });
  }

  public title = 'Bonnie App';
  public locationId = '';
  public locations = [];
  public list = [];
  public heads2 = [];
  public data1 = DUMMY_DATA1;
  public data2 = DUMMY_DATA1;
  public optionsData = [];
  public myControl: FormControl;
  public mergeClickBool = false;
  private isSorted = false;
  public active = 2;
  public filteredOptions: Observable<any[]>;
  public totalFlatsToSale = 0;
  public plantingInfoForm: FormGroup;
  

  getTotalOfColumn(array,key){
    let total = array.reduce(function(a,b){
      return a + b[key]
    },0);
    return total;
  }
  
  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }
  

  ngOnInit() {

    if(this.commonData.getStage()==0){
      this.router.navigate(["/"]);
    }else{
      console.error('Something went wrong with routing/redirecting');
    }


    this.locations = [
      {id: 1, name: 'Milton, WI'}
    ];
    this.getPlants();
    this.list = [
      'Planting Information'
    ];
    this.heads2 = [
      'Seed Lot Number',
      'Plug Flats Plotted',
      'Finished Trays',
      'Locator Number',
      'Potted Date',
      'House#/Bay#'
    ];

    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val) : this.optionsData.slice());

    this.totalFlatsToSale = this.getTotalOfColumn(this.data1,'pfd');

    this.plantingInfoForm = new FormGroup({
      datePotted: new FormControl(null, Validators.required)
    });  
  }

  

  openDialog(currentItem): void {
    let dialogRef = this.dialog.open(IconDialogComponent, {
      data: currentItem,
    });
  }


  createPlants() {
    this.plantingInformationService.createPlants().subscribe(res => {
      console.log(res);
    },
      err => {
        console.log('Error occured while creating plant varities');
      });
  }

  getPlants() {
    this.plantingInformationService.getPlants().subscribe(res => {
      this.plants = res;
    },
      err => {
        console.log('Error occured while retrieving plant varities');
      });
  }

  sort() {
    if ( !this.isSorted ) {
      this.data1 = this.data1.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
      this.isSorted = true;
    }
    this.data1 = this.data1.reverse();
  }

  filter(val: any): any[] {
    return this.optionsData.filter(option =>
      option.name.toLowerCase().indexOf(val.name.toLowerCase()) === 0);
  }

  ngAfterViewInit() {
    const scrollElement = this.el.nativeElement.querySelector('.right-scroll');
    const theadElement =  this.el.nativeElement.querySelector('table thead');
    if (scrollElement) {
      this.renderer.listen(scrollElement, 'scroll', (evt) => {
      });
    }
  }


  
}
