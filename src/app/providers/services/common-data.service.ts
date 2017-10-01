import { Injectable } from '@angular/core';
import { DUMMY_DATA1, DUMMY_DATA2 } from './../../dummy';
import { PlantInfo, PlugTrayInfo, PlantingInfo } from './../classes/plantInfo.class';

@Injectable()
export class CommonDataService {
	private currentStage;
	private stageUrls = [];
  public  plantData = [];
  constructor() { 
  	this.currentStage = 0;
  	this.stageUrls = ['app-plug-tray-information','app-planting-information','app-receiving-from-other-stations','app-ship-to-other-stations','app-total-salable','app-store-delivery','app-master-view'];
    
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


}
