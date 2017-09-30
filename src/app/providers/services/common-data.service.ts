import { Injectable } from '@angular/core';

@Injectable()
export class CommonDataService {
	private currentStage;
	private stageUrls = [];

  constructor() { 
  	console.log('commondata constructor init');
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
