import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { PlantingInformationService } from './planting-information.service';
import { Plant } from './plant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppSharedService } from '../providers/services/app-shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-planting-information',
  templateUrl: './planting-information.component.html',
  styleUrls: ['./planting-information.component.scss'],
  providers: [PlantingInformationService]
})
export class PlantingInformationComponent implements OnInit, AfterViewInit {
  public plants: Plant[];
  public list = [];
  public heads2 = [];
  public optionsData = [];
  public myControl: FormControl;
  public mergeClickBool = false;
  private isSorted = false;
  public active = 2;
  public totalFlatsToSale = 0;
  public plantingInfoForm: FormGroup;
  constructor(
    private appSharedService: AppSharedService,
    private plantingInformationService: PlantingInformationService,
    private renderer: Renderer2,
    private el: ElementRef,
    public router: Router
  ) {
  }

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
