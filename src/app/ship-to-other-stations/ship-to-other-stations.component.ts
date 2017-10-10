import { Component, OnInit } from '@angular/core';
import { AppSharedService } from '../providers/services/app-shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ship-to-other-stations',
  templateUrl: './ship-to-other-stations.component.html',
  styleUrls: ['./ship-to-other-stations.component.scss']
})
export class ShipToOtherStationsComponent implements OnInit {
  public heads4 = [];
  public mergeClickBool = false;
  constructor(private appSharedService: AppSharedService, private router: Router) { }


  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {
    this.heads4 = [
      { 'name': 'Seed Lot Number', 'icon': 'down' },
      { 'name': 'Finished Trays', 'icon': 'down' },
      { 'name': 'Locator Number', 'icon': 'down' },
      { 'name': 'House#/Bay#', 'icon': 'down' },
      { 'name': 'Ship to Chicago', 'icon': 'cross' },
      { 'name': 'Ship to Minneapolis', 'icon': 'cross' },
      { 'name': 'Ship to Des Moines', 'icon': 'cross' },
      { 'name': 'Ship to Milwaukee', 'icon': 'cross' },
      { 'name': 'Ship to St.Louis', 'icon': 'cross' },
      { 'name': 'Add Ship to', 'icon': 'add' }
    ];
  }

  shipPlant(item) {
    item.shipped = true;
  }
  cancelShip(item) {
    item.shipped = false;
  }
}
