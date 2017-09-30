import { DUMMY_DATA1, DUMMY_DATA2 } from './../dummy';
import { DomSanitizer } from '@angular/platform-browser';
import {FormControl} from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import {CommonDataService} from '../providers/services/common-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receiving-from-other-stations',
  templateUrl: './receiving-from-other-stations.component.html',
  styleUrls: ['./receiving-from-other-stations.component.scss']
})
export class ReceivingFromOtherStationsComponent implements OnInit{

  constructor(
    private sz: DomSanitizer,
    public commonData:CommonDataService,
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

  public list = [];
  public heads3 = [];
  public data1 = DUMMY_DATA1;
  public data2 = DUMMY_DATA1;
  public optionsData = [];
  public myControl: FormControl;
  public mergeClickBool = false;
  private isSorted = false;
  public active = 3;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {


    if(this.commonData.getStage()==0){
      this.router.navigate(["/"]);
    }else{
      console.error('Something went wrong with routing/redirecting');
    }

        
        this.list = [
          'Receiving'
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

  }

  sort() {
    if ( !this.isSorted ) {
      this.data1 = this.data1.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).reverse();
      this.isSorted = true;
    }
    this.data1 = this.data1.reverse();
  }

  receivePlant(item){
    item.received = true;
  }
  

}
