import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-salable',
  templateUrl: './total-salable.component.html',
  styleUrls: ['./total-salable.component.scss']
})
export class TotalSalableComponent implements OnInit {

  constructor(private appSharedService: AppSharedService,
    public router: Router) { }
  public reasonCodes = [];
  public heads5 = [];
  public mergeClickBool = false;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {
    this.heads5 = [
      'Seed Lot Number',
      'Quantity',
      'Locator #',
      'House#/Bay#',
      ['#Discarded', 'Reason Code'],
      'Total Flats to Sale'
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
  }
}
