import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, Inject, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MdAutocompleteTrigger } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AppSharedService } from '../providers/services/app-shared.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

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
  public mergeClickBool = false;
  public active = 1;
  public greenHousePlants: any[];
  public totalFlatsToSale = 0;
  public PlugTrayForm: FormGroup;
  public varietyControl: FormControl;

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
  constructor(
    private appSharedService: AppSharedService,
    private renderer: Renderer2,
    private el: ElementRef,
    private sz: DomSanitizer,
    public router: Router
  ) {
    this.appSharedService.varietyOptions = this.appSharedService.varietyOptions || [];
    this.myControl = new FormControl();
    this.varietyControl = new FormControl();
  }

  @ViewChild(MdAutocompleteTrigger) trigger;

  getTotalOfColumn(array, key) {
   const total = array.reduce(function (a, b) {
      return a + b[key];
    }, 0);
    return total;
  }

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {
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

    this.greenHousePlants = this.appSharedService.plants;


    this.PlugTrayForm = new FormGroup({
      dateReceived: new FormControl(null, Validators.required)
    });
  }

  displayFn(order): string {
    this.newPlant = { ...order };
    return null;
  }

  /**
   * [addPlant description]
   */
  addPlant(event, newPlant) {
    if (newPlant) {
      const tempNewPlant = Object.assign({}, newPlant);
      tempNewPlant.plugTray = Object.assign({}, newPlant.plugTray);
      tempNewPlant.plantingInfo = Object.assign({}, newPlant.plantingInfo);
      tempNewPlant.receivingData = Object.assign({}, newPlant.receivingData);
      tempNewPlant.totalSalable = Object.assign({}, newPlant.totalSalable);
      tempNewPlant.storeDeliveryData = Object.assign({}, newPlant.storeDeliveryData);
      this.appSharedService.varietyOptions = [
        ...this.appSharedService.varietyOptions,
        tempNewPlant
      ];
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
   * [filter values for variety inpiut]
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
}
