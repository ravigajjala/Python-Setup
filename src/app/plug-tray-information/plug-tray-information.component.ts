import {
  Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild
} from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


import { AppSharedService } from '../providers/services/app-shared.service';
import { PlugToDeliver } from '../providers/classes/plantInfo.class';
import { ShipToInfo } from '../providers/classes/plantInfo.class';

import {IconDialogComponent} from '../icon-dialog/icon-dialog.component';

@Component({
  selector: 'app-plug-tray-information',
  templateUrl: './plug-tray-information.component.html',
  styleUrls: ['./plug-tray-information.component.scss']
})
export class PlugTrayInformationComponent implements OnInit, AfterViewInit {
  public list = [];
  public heads = [];
  public reasonCodes = [];
  public optionsData = [];
  public myControl: FormControl;
  public varietyControl: FormControl;
  public mergeClickBool = false;
  public greenHousePlants: any[];
  public totalFlatsToSale = 0;
  public PlugTrayForm: FormGroup;
  public weekNumber: number;
  private plugNotifStatus = [];
  private type: string = "PLUG";

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
  private newPlant: any;
  public locations = [];
  private loader: boolean;
  constructor(
    private appSharedService: AppSharedService,
    private renderer: Renderer2,
    private el: ElementRef,
    private sz: DomSanitizer,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.appSharedService.varietyOptions = this.appSharedService.varietyOptions || [];
    console.log('Varieties');
    console.log(this.appSharedService.varietyOptions);
    this.myControl = new FormControl();
    this.varietyControl = new FormControl();
    this.loader = true;
  }

  @ViewChild(MatAutocompleteTrigger) trigger;

  getTotalOfColumn(array, key) {
    const total = array.reduce(function (a, b) {
      return a + b[key];
    }, 0);
    return total;
  }


  setNotifStatus(val, index) {
    const currentStatus = this.plugNotifStatus[index];
    if(val.type === "PLUG") {
      // iterate through each key in object
      for (const key in val.plugTray) {
        if (val.plugTray.hasOwnProperty(key)) {
          if (!val.plugTray[key]) {
            this.plugNotifStatus[index] = false;
            break;
          } else {
            this.plugNotifStatus[index] = true;
          }
        }
      }

      if (!currentStatus) {
        if (this.plugNotifStatus[index]) {
          this.appSharedService.totalNotif++;
        }
      } else {
        if (!this.plugNotifStatus[index]) {
          this.appSharedService.totalNotif--;
        }
      }
    }
  }

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {
    this.appSharedService.sendUserRelatedInfo().subscribe(
      res => { },
      err => console.log(err)
    );
    this.list = [
      'Plug Tray Information'
    ];

    this.heads = [
      'Plug Flats Received',
      'Date received',
      'Plug Flats Plotted',
      'Plug Flats Discarded',
      'Reasons Code',
      'Seed Lot Number'
    ];

    this.reasonCodes = [
      { 'code': 'A', 'reason': 'Poor germ' },
      { 'code': 'B', 'reason': 'Pest issue' },
      { 'code': 'C', 'reason': 'irrigation problems' },
      { 'code': 'D', 'reason': 'Disease' },
      { 'code': 'E', 'reason': 'Excess' },
      { 'code': 'F', 'reason': 'Fell/Dropped' },
      { 'code': 'G', 'reason': 'Other/Act Of God' },
    ];
    this.PlugTrayForm = new FormGroup({
      dateReceived: new FormControl()
    });
    this.getPlugToDeliverData();
    this.getGreenHouseVarities();
  }

  displayFn(order): string {
    this.newPlant = { ...order };
    return null;
  }

  getGreenHouseVarities() {
    return this.appSharedService.getPlantVarieties().subscribe(
      plants => {
        plants.sort((a, b) => {
          if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
          }
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
          }
          return 0;
        });
        this.appSharedService.plants = plants;
        this.greenHousePlants = this.appSharedService.plants;
        this.loader = false;
      },
      err => {
        console.log('Unable to retrive green house plants list');
      });
  }

  /**
   * [When user selects a variety from typeahed it creates a new object entry in the Kind]
   * [Here preparing new object with all screens properties]
   * [Then calling createPlugToDeliverData function by passing prepared new object]
   */
  addPlant(event, newPlant) {
    if (newPlant) {
      const tempNewPlant = Object.assign({}, newPlant);
      tempNewPlant.userId = this.appSharedService.userId;
      tempNewPlant.userGreenHouseLocation = this.appSharedService.currentGreenHouseLocation.city +
        ', ' + this.appSharedService.currentGreenHouseLocation.state;
      tempNewPlant.receivedInfoFromOtherStations = false;
      tempNewPlant.plugTray = Object.assign({}, newPlant.plugTray);
      tempNewPlant.plantingInfo = Object.assign({}, newPlant.plantingInfo);
      tempNewPlant.receivingInfo = Object.assign({}, newPlant.receivingInfo);
      tempNewPlant.salableInfo = Object.assign({}, newPlant.salableInfo);
      tempNewPlant.appStoreDelivery = Object.assign({}, newPlant.appStoreDelivery);
      tempNewPlant.shipToInfo = Object.assign({}, newPlant.shipToInfo);
      tempNewPlant.type = this.type;
      this.createPlugToDeliverData(tempNewPlant);
    }
    this.trigger.closePanel();
  }

  ngAfterViewInit() {
    const scrollElement = this.el.nativeElement.querySelector('.right-scroll');
    const theadElement = this.el.nativeElement.querySelector('table thead');
    if (scrollElement) {
      this.renderer.listen(scrollElement, 'scroll', (evt) => {
      });
    }
  }

  /**
   * [filter values for variety input]
   * @param  {any}   val [user input value]
   */
  filterVariety(val: any): any[] {
    return this.appSharedService.varietyOptions.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  /**
   * [filter values for add plant autocomplete]
   * @param  {any}   val [user input value]
   */
  filterAddPlant(val: any): any[] {
    if (val && typeof val === 'string') {
      return this.optionsData.filter(option =>
        option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
  }

  /**
   * [Invoking from addPlant() function]
   * [It adds plugToDeliver object to plugToDeliver Kind]
   * [After adding it to kind it retrives plugToDeliver data to display the added plug in the ui]
   * @param  {PlugToDeliver}   plugToDeliverData [user selects the variety from the auto complete]
   * @return it returns all varities from plugToDeliver Kind
   */
  createPlugToDeliverData(plugToDeliverData: PlugToDeliver): any {
    this.appSharedService.createPlugToDeliverData(plugToDeliverData)
      .subscribe(res => {
        this.getPlugToDeliverData();
      },
      err => {
        console.log('Create error');
      });
  }

  /**
  * [Retriving all plugToDeliver objects from plugToDeliver Kind]
  * @return it returns all varities from plugToDeliver Kind
  */
  // TODO:: Make shared function
  getPlugToDeliverData() {
    return this.appSharedService.getPlugToDeliverData().subscribe(
      res => {
        this.appSharedService.varietyOptions = res;
        this.appSharedService.totalNotif = 0;
        this.plugNotifStatus = [];
        this.appSharedService.varietyOptions.forEach((val, index) => {
          this.setNotifStatus(val, index);
        });
      },
      err => {
        console.log('Plug to deliver data retrive error');
      }
    );
  }

  /**
   * [Updates plugToDeliver object to plugToDeliver Kind]
   * @param  {PlugToDeliver}   plugToDeliverData [plugToDeliver object sending from when user input value change]
   */
  // TODO:: Make shared function
  updatePlugToDeliverData(plugToDeliverData: PlugToDeliver, index): any {
    this.setNotifStatus(plugToDeliverData, index);
    this.appSharedService.updatePlugToDeliverData(plugToDeliverData)
      .subscribe(res => { },
      err => {
        console.log('Update error');
      });
  }

  /**
   * [Updates plugToDeliver object to plugToDeliver kind]
   * @param  {Date}   date [user input date from datepicker]
   * @param  {PlugToDeliver}   plugToDeliverData [plugToDeliver object]
   */
  calculateWeekNumber(date: Date, plugToDeliverData: PlugToDeliver) {
    const weekNumber = moment(date).week();
    plugToDeliverData.weekNumber = weekNumber;
  }
}
