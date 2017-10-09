import { Injectable } from '@angular/core';
import { DUMMY_DATA1, DUMMY_DATA2 } from './../../dummy';
import { PlantInfo, PlugTrayInfo, PlantingInfo } from './../classes/plantInfo.class';

@Injectable()
export class CommonDataService {
	private currentStage;
	private stageUrls = [];
  public  plantData = [];
  public plantList =[];
  public locations =[];
  public reasonCodes = [
      {'code':'A','reason':'Poor germ'},
      {'code':'B','reason':'Pest issue'},
      {'code':'C','reason':'irrigation problems'},
      {'code':'D','reason':'Disease'},
      {'code':'E','reason':'Excess'},
      {'code':'F','reason':'Fell/Dropped'},
      {'code':'G','reason':'Other/Act Of God'},
    ];;
  private plant_varieties = [{
        'name': 'Better Boy Tomato',
        'icon': 'tomato-bboy'
    }, {
        'name': 'Husky Cherry Red Tomato',
        'icon': 'tomato-hcr'
    }, {
        'name': 'Red Beefsteak Tomato',
        'icon': 'tomato-rb'
    }, {
        'name': 'Green Bell Pepper',
        'icon': 'tomato-rb'
    }, {
        'name': 'Hot Banana Pepper',
        'icon': 'pepper-banana-hot',
    }, {
        'name': 'Jalapeno Pepper',
        'icon': 'pepper-jalapeno'
    }, {
        'name': 'Sweet Banana Pepper',
        'icon': 'pepper-banana-sweet',
    }, {
        'name': 'Broccoli',
        'icon': 'broccoli'
    }, {
        'name': 'Cucumber',
        'icon': 'cucumber-traditional'
    }, {
        'name': 'EggPlant',
        'icon': 'eggplant'
    }, {
        'name': 'Better Boy Tomato',
        'icon': 'tomato-bboy'
    }, {
        'name': 'Husky Cherry Red Tomato',
        'icon': 'tomato-hcr'
    }, {
        'name': 'Red Pepper Bell',
        'icon': 'pepper-bell-red'
    }, {
        'name': 'Kale',
        'icon': 'kale'
    }, {
        'name': 'Hot Banana Pepper',
        'icon': 'pepper-banana-hot'
    }, {
        'name': 'Basil',
        'icon': 'basil'
    }, {
        'name': 'Hot Banana Pepper',
        'icon': 'pepper-banana-hot'
    }, {
        'name': 'Cilantro',
        'icon': 'cilantro'
    }, {
        'name': 'Jalapeno Pepper',
        'icon': 'pepper-jalapeno'
    }, {
        'name': 'Egg Plant',
        'icon': 'eggplant'
    }];;

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
