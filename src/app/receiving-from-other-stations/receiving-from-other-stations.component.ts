import { Component, OnInit } from '@angular/core';
import { IconDialogComponent } from '../icon-dialog/icon-dialog.component';
import { AppSharedService } from '../providers/services/app-shared.service';
import { Router } from '@angular/router';

import { PlugToDeliver } from '../providers/classes/plantInfo.class';


@Component({
  selector: 'app-receiving-from-other-stations',
  templateUrl: './receiving-from-other-stations.component.html',
  styleUrls: ['./receiving-from-other-stations.component.scss']
})
export class ReceivingFromOtherStationsComponent implements OnInit {

  constructor(
    private appSharedService: AppSharedService,
    private router: Router
  ) {
  }

  public list = [];
  public heads3 = [];
  public reasonCodes = [];
  public optionsData = [];
  public mergeClickBool = false;

  mergeClick(e: any, mergeText: string) {
    mergeText === 'start_merge' ? this.mergeClickBool = true : mergeText === 'cancel_merge' ? this.mergeClickBool = false : '';
  }

  ngOnInit() {
    this.list = [
      'Receiving'
    ];

    this.heads3 = [
      'Seed Lot Number',
      'Finished Trays',
      'Locator Number',
      'House#/Bay#',
      'Quantity',
      '#Discarded',
      'Reason Code'
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

    this.appSharedService.sendUserRelatedInfo().subscribe(
      res => { },
      err => console.log(err)
    );

    this.getPlugToDeliverData();
  }

  /**
   * [Retriving all plugToDeliver objects from plugToDeliver Kind]
   * @return it returns all varities from plugToDeliver Kind
   */
  // TODO:: Make shared function
  getPlugToDeliverData(): any {
    return this.appSharedService.getPlugToDeliverData().subscribe(
      res => {
        this.appSharedService.varietyOptions = res;
        this.getPlugToDeliverDataForReceivedInfoScreen();
      },
      err => {
        console.log('Plug to deliver data retrive error');
      }
    );
  }

  getPlugToDeliverDataForReceivedInfoScreen(): any {
    return this.appSharedService.getPlugToDeliverDataForReceivedInfoScreen().subscribe(
      receivedVarieties => {
        let receivedButtonCount = 0;
        receivedVarieties.forEach(
          variety => {
            if (variety.showReceiveButton) {
              receivedButtonCount += 1;
            }
          }
        );
        this.appSharedService.receivedVarietiesCountWithReceivedButton = receivedButtonCount;
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
  updatePlugToDeliverData(plugToDeliverData: PlugToDeliver, receiveButtonClicked: boolean): any {
    this.appSharedService.updatePlugToDeliverData(plugToDeliverData)
      .subscribe(res => {
        if (receiveButtonClicked) {
          this.appSharedService.updatePlugToDeliverDataOfTheParentVariety(plugToDeliverData).subscribe(
            response => { },
            error => console.log(error)
          );
        }
      },
      err => {
        console.log('Update error');
      });
  }

  receivePlant(item): void {
    
    if(this.appSharedService.loggedInUserGreenHouseLocation == this.appSharedService.currentGreenHouseLocation.city){
      item.receivedButonClicked = true;
      item.showReceiveButton = false;
      this.updatePlugToDeliverData(item, true);
    }
  }
}
