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
  public disabledColumns = [];
  public totalOfLocation = [,,,,0,0,0,0,0];
  public locationNames = ['Chicago','Minneapolis','Des Moines','Milwaukee','St.Louis'];

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

  shipColumn(item){
    this.disabledColumns[item]=true;
  }
  cancelShip(item){
    this.disabledColumns[item]=false;
  }

  getTotalOfColumn(key){
    this.totalOfLocation[key+4] = this.appSharedService.varietyOptions.reduce(function(a,b){
       return a + parseInt(b.shipToData.locationValues[key] || 0);
    },0);
    console.log(this.totalOfLocation);
  }
}
