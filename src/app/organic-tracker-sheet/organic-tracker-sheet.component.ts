import { DUMMY_DATA1, DUMMY_DATA2 } from './../dummy';
import { Component, OnInit, AfterViewInit, Renderer2, ElementRef,Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from '../login/login.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {IconDialogComponent} from '../icon-dialog/icon-dialog.component';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { OrganicTrackerSheetService } from './organic-tracker-sheet.service';

@Component({
  selector: 'app-organic-tracker-sheet',
  templateUrl: './organic-tracker-sheet.component.html',
  styleUrls: ['./organic-tracker-sheet.component.scss'],
  providers: [LoginService, OrganicTrackerSheetService]
})
export class OrganicTrackerSheetComponent implements OnInit, AfterViewInit {

  constructor(
    public loginService: LoginService,
    private renderer: Renderer2,
    private el: ElementRef,
    private sz: DomSanitizer,
    public dialog: MdDialog,
    private organicTrackerSheetService: OrganicTrackerSheetService
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
  public active = 1;
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

  openDialog(currentItem): void {
    let dialogRef = this.dialog.open(IconDialogComponent, {
      data: currentItem,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
    this.organicTrackerSheetService.getLocations().subscribe(
      res => {
        this.locations = res;
      },
      err => {
         console.log('Error occured while retrieving locations');
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


