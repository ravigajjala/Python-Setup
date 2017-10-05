import { Injectable } from '@angular/core';
import { DUMMY_DATA1, DUMMY_DATA2 } from './../../dummy';
import { PlantInfo, PlugTrayInfo, PlantingInfo } from './../classes/plantInfo.class';

@Injectable()
export class CommonDataService {
	private currentStage;
	private stageUrls = [];
  public  plantData = [];
  public plantList =[];
  public reasonCodes = [];

  constructor() { 
  	this.currentStage = 0;
  	this.stageUrls = ['app-plug-tray-information','app-planting-information','app-receiving-from-other-stations','app-ship-to-other-stations','app-total-salable','app-store-delivery','app-master-view'];
    this.reasonCodes == [
      {'code':'A','reason':'Poor germ'},
      {'code':'B','reason':'Pest issue'},
      {'code':'C','reason':'irrigation problems'},
      {'code':'D','reason':'Disease'},
      {'code':'E','reason':'Excess'},
      {'code':'F','reason':'Fell/Dropped'},
      {'code':'G','reason':'Other/Act Of God'},
    ];
  }

  setStage(value:number){
  	this.currentStage = value;
  }

  getStage():number{
  	return this.currentStage;
  }

  getStageUrls(){
  	return this.stageUrls;
  }

  /**
   * [getTotalOfColumn - return total of the given key for input object array]
   * @param {[type]} array [the array for which the key is present]
   * @param {[type]} key   [the key for which the totak is to be calculated]
   */
  getTotalOfColumn(array,key){
    let total = array.reduce(function(a,b){
      return a + b[key]
    },0);
    return total;
  }


}
