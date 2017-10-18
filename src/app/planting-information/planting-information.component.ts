import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { PlugToDeliver, Plant } from '../providers/classes/plantInfo.class';
import { AppSharedService } from '../providers/services/app-shared.service';
@Component({
  selector: 'app-planting-information',
  templateUrl: './planting-information.component.html',
  styleUrls: ['./planting-information.component.scss']
})
export class PlantingInformationComponent implements OnInit, AfterViewInit {
  public plants: Plant[];
  public list = [];
  public heads2 = [];
  public optionsData = [];
  public myControl: FormControl;
  public mergeClickBool = false;
  private isSorted = false;
  public totalFlatsToSale = 0;
  public plantingInfoForm: FormGroup;
  constructor(
    private appSharedService: AppSharedService,
    private renderer: Renderer2,
    private el: ElementRef,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.list = [
      'Planting Information'
    ];
    this.heads2 = [
      'Seed Lot Number',
      'Plug Flats Plotted',
      'Finished Trays',
      'Locator Number',
      'Potted Date',
      'House#/Bay#'
    ];

    this.plantingInfoForm = new FormGroup({
      datePotted: new FormControl(null, Validators.required)
    });

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
  getPlugToDeliverData() {
    return this.appSharedService.getPlugToDeliverData().subscribe(
      res => {
        this.appSharedService.varietyOptions = res;
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
  updatePlugToDeliverData(plugToDeliverData: PlugToDeliver): any {
    this.appSharedService.updatePlugToDeliverData(plugToDeliverData)
      .subscribe(res => { },
      err => {
        console.log('Update error');
      });
  }

  ngAfterViewInit() {
    const scrollElement = this.el.nativeElement.querySelector('.right-scroll');
    const theadElement = this.el.nativeElement.querySelector('table thead');
    if (scrollElement) {
      this.renderer.listen(scrollElement, 'scroll', (evt) => {
      });
    }
  }
}
