export class PlantInfo{
	'id':string;
	'name':string;
	'icon':string;
	'plugTray': PlugTrayInfo;
	'plantingInformation' : PlantingInfo;
}

export class PlugTrayInfo{
	'plugFlatsReceived': number;
	'dateReceived': Date;
	'plugFlatsPlotted': number;
	'plugFlatsDiscarded': number;
	'reasonsCode': string;
	'seedLotNumber': number;
}

export class PlantingInfo{
	'seedLotNumber': number;
	'plugFlatsPlotted': number;
	'finishedTrays': string;
	'locatorNumber': number;
	'pottedDate': Date;
	'houseBay': string;
}

export class Location {
    id: string;
    city: string;
    state: string;
}