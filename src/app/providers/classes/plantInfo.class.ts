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

export class ReceivingInfo{
	'houseBay':string;
	'quantity': number;
	'locator': string;
	'discarded': number;
	'reasonCode':string;
}

export class SalableInfo {
	'discarded': number;
	'reasonCode': string;
}

export class AppStoreDelivery {
    'totalFlatstoSale':number;
    'routeNumberSale':number[];
    'discarded':number;
    'reasonCode':string;
    'check':boolean;
}


export class Location {
    id: string;
    city: string;
    state: string;
}