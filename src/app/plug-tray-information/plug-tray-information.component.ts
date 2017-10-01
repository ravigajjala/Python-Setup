import { DUMMY_DATA1, DUMMY_DATA2 } from './../dummy';
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef,Inject, EventEmitter, Input, Output } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
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
    private sz: DomSanitizer,
    public dialog: MdDialog,
    public commonData: CommonDataService,
    public router:Router
  ) { 

    this.myControl = new FormControl();
    this.varietyControl = new FormControl();
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
  public heads = [];
  public reasonCodes = [];
  public data1 = DUMMY_DATA1;
  public data2 = DUMMY_DATA1;
  public optionsData = [];
  public myControl: FormControl;
  public mergeClickBool = false;
  private isSorted = false;
  public active = 1;
  public filteredOptions: Observable<any[]>;
  public totalFlatsToSale = 0;
  public PlugTrayForm: FormGroup;
  public varietyControl: FormControl;
  public varietyOptions: any[];
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

  public options1 = DUMMY_DATA2;
  private newPlant: any;

  openDialog(currentItem): void {
    let dialogRef = this.dialog.open(IconDialogComponent, {
      data: currentItem,
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

  ngOnInit() {
    console.log('plug tray - child 1 init');
    console.log('currentStage' + this.commonData.getStage());
    if(this.commonData.getStage()==0){
      this.router.navigate(["/"]);
    }else{
      console.error('Something went wrong with routing/redirecting');
    }

    this.locations = [
      {id: 1, name: 'Milton, WI'}
    ];

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

    this.varietyControl.valueChanges
      .subscribe(
        val=> {
          setTimeout(() => {this.varietyOptions = val ? this.filterVariety(val) : this.commonData.plantData}, 0);
      });

    this.PlugTrayForm = new FormGroup({
      dateReceived: new FormControl(null, Validators.required)
    });

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
      console.log('np', this.newPlant);

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

  /**
   * [filter values for variety inpiut]
   * @param  {any}   val [user input value]
   */
    filterVariety(val:any):any[] {
      return this.commonData.plantData.filter(option =>
        option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
  
}


