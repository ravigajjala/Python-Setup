import { DUMMY_DATA1, DUMMY_DATA2 } from './../dummy';
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef,Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from '../login/login.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {CommonDataService} from '../providers/services/common-data.service';
import {ApiService} from '../providers/services/api.service';
import { PlantInfo, PlugTrayInfo, PlantingInfo, ReceivingInfo, SalableInfo } from './../providers/classes/plantInfo.class';

import { Router } from '@angular/router';


import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-organic-tracker-sheet',
  templateUrl: './organic-tracker-sheet.component.html',
  styleUrls: ['./organic-tracker-sheet.component.scss'],
  providers: [LoginService]
})
export class OrganicTrackerSheetComponent implements OnInit, AfterViewInit {

  constructor(
    public loginService: LoginService,
    private renderer: Renderer2,
    private el: ElementRef,
    private sz: DomSanitizer,
    private commonData: CommonDataService,
    private apiService: ApiService,
    public router:Router
  ) {

    this.myControl = new FormControl();
    let i = 0;
    this.data2 = DUMMY_DATA1.map((d,index) => {
      //create each plantInfo Object
      this.commonData.plantData[index] = new PlantInfo();
      this.commonData.plantData[index].name = d.name;
      this.commonData.plantData[index].id = d.id;
      this.commonData.plantData[index].icon = d.icon;
      this.commonData.plantData[index].plugTray = new PlugTrayInfo();
      this.commonData.plantData[index].plantingInfo = new PlantingInfo();
      this.commonData.plantData[index].receivingData = new ReceivingInfo();
      this.commonData.plantData[index].totalSalable = new SalableInfo();
      this.commonData.plantData[index]['nameHtml'] = sz.bypassSecurityTrustHtml(
        `<svg class="icon st${i}"><use xlink:href="../../assets/sprites/icon-sprite-sheet.svg#${d.icon}"/></svg>`
      );
      i < 9 ? i++ : i = 0;

      this.commonData.plantData[index]['shipped'] = false;
      return this.commonData.plantData[index];
    });
  }

  public title = 'Bonnie App';
  public locationId = '';
  public locations = [];
  public list = [];
  public heads = [];
  public heads2 = [];
  public heads3 = [];
  public heads4 = [];
  public heads5 = [];
  public heads6 = [];
  public reasonCodes = [];
  public data1 = DUMMY_DATA1;
  public data2 = DUMMY_DATA1;
  public optionsData = [];
  public myControl: FormControl;
  public mergeClickBool = false;
  private isSorted = false;
  public active = 0;
  public filteredOptions: Observable<any[]>;
  public totalFlatsToSale = 0;
  public options = [
    {
      name: 'Hot Banana Pepper'
    },
    {
      name: 'Green Bell Pepper'
    },
    {
      name: 'Jalapeno Pepper'
    },
    {
      name: 'Serrano Pepper'
    }
  ];
  /*public options1 = [
    'Hot Banana Pepper',
    'Green Bell Pepper',
    'Jalapeno Pepper',
    'Serrano Pepper'
  ];*/

  public options1 = DUMMY_DATA2;
  private newPlant: any;



  updateStage(value){
    if(this.active!=value){
      this.active = value;
      this.commonData.setStage(value);
      console.log('satge updated to' + this.commonData.getStage());
      this.router.navigate(["/app-organic-tracker-sheet/"+(this.commonData.getStageUrls())[value-1]]);
    }
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

    this.list = [
      'Plug Tray Information',
      'Planting Information',
      'Receiving',
      'Ship To',
      'Total Salable',
      'To Store Delivery / Balance',
      'Master View'
    ];

    this.heads = [
      'Plug Flats Received',
      'Date received',
      'Plug Flats Plotted',
      'Plug Flats Discarded',
      'Reasons Code',
      'Seed Lot Number'
    ];

    this.heads2 = [
      'Seed Lot Number',
      'Plug Flats Plotted',
      'Finished Trays',
      'Locator Number',
      'Potted Date',
      'House#/Bay#'
    ];


    this.heads3 = [
      'Seed Lot Number',
      'Finished Trays',
      'Locator Number',
      'House#/Bay#',
      'Quantity',
      'Locator #',
      '#Discarded',
      'Reason Code'
    ];

    this.heads4 = [
      {'name':'Seed Lot Number', 'icon':'down'},
      {'name':'Finished Trays', 'icon':'down'},
      {'name':'Locator Number', 'icon':'down'},
      {'name':'House#/Bay#', 'icon':'down'},
      {'name':'Ship to Chicago', 'icon':'cross'},
      {'name':'Ship to Minneapolis', 'icon':'cross'},
      {'name':'Ship to Des Moines', 'icon':'cross'},
      {'name':'Ship to Milwaukee', 'icon':'cross'},
      {'name':'Ship to St.Louis', 'icon':'cross'},
      {'name':'Add Ship to', 'icon':'add'}
    ];

    this.heads5 = [
      'Seed Lot Number',
      'Quantity',
      'Locator #',
      'House#/Bay#',
      '#Discarded',
      'Reason Code',
      'Total Flats to Sale'
    ];

    this.heads6 = [
      'Seed Lot Number',
      'Locator #',
      'House#/Bay#',
      'Total Flats to Sale',
      ['68-00',
      '68-01',
      '68-02',
      '68-03',
      '68-04',
      '68-05',
      '68-06',
      '68-07',
      '68-08',
      '68-09',
      '68-10',
      '68-11',
      '68-12',
      '68-13',
      '68-14',
      '68-15'],
      'Delivered',
      ['#Discarded',
      'Reason Code'],
      'Total Balance',
      'Check'
    ];

    this.reasonCodes = [
      {'code':'A','reason':'Poor germ'},
      {'code':'B','reason':'Pest issue'},
      {'code':'C','reason':'irrigation problems'},
      {'code':'D','reason':'Disease'},
      {'code':'E','reason':'Excess'},
      {'code':'F','reason':'Fell/Dropped'},
      {'code':'G','reason':'Other/Act Of God'},
    ];

    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filter(val) : this.optionsData.slice());

    this.totalFlatsToSale = this.getTotalOfColumn(this.data1,'pfd');
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


  displayFn(order): string {
      this.newPlant = {...order};
      return order ? order.name : order;
  }

  addPlant(e: any) {
    if (this.newPlant) {
        this.newPlant = { ...this.newPlant, id: this.data1.length + 1 };
        this.data1 = [
            ...this.data1,
            this.newPlant
        ];
        this.data2 = [
            ...this.data2,
            this.newPlant
        ];
        this.newPlant = null;
    }
  }

  ngAfterViewInit() {
    const scrollElement = this.el.nativeElement.querySelector('.right-scroll');
    const theadElement =  this.el.nativeElement.querySelector('table thead');
    if (scrollElement) {
      this.renderer.listen(scrollElement, 'scroll', (evt) => {
      });
    }
  }

  shipPlant(item){
    item.shipped = true;
  }
  cancelShip(item){
    item.shipped=false;
  }

  receivePlant(item){
    item.received = true;
  }
  
}


