export class PlantingInfo {
	finishedTrays: number;
	locatorNumber: number;
	pottedDate: Date;
	houseBay: string;
}

export class ReceivingInfo {
	houseBay: string;
	quantity: number;
	locator: string;
	discarded: number;
	reasonCode: string;
}

export class SalableInfo {
	discarded: number;
	reasonCode: string;
	totalFlatsToSale: any;
}

export class AppStoreDelivery {
	routeNumberSale: number[];
	discarded: number;
	reasonCode: string;
	check: boolean;
	delivered: number;
}

export class ShipToInfo {
	locatorNumber: number;
	[key: string]: number;
}

export class Location {
	datastore_id: string;
	city: string;
	state: string;
	firstName: string;
	lastName: string;
	userEmail: string;
	locatorNumber: number;
	shipToLocations: string[];
	routes: number[];
}

export class Plant {
	id: number;
	name: string;
	icon: string;
	url: string;
	color_id: string;
	organic: boolean;
}

export class User {
	id: number;
	name: string;
	city: string;
	state: string;
	email: string;
}

export class PlugToDeliver {
	weekNumber: number;
	name: string;
	type: string;
	userGreenHouseLocation: string;
	receivedInfoFromOtherStations: boolean;
	plugTray: PlugTray;
	plantingInfo: PlantingInfo;
	receivingInfo: ReceivingInfo;
	shipToInfo: ShipToInfo;
	salableInfo: SalableInfo;
	appStoreDelivery: AppStoreDelivery;
}

export class PlugTray {
	plugFlatsReceived: number;
	dateReceived: Date;
	plugFlatsPotted: number;
	plugFlatsDiscarded: number;
	reasonsCode: string;
	seedLotNumber: string;
}

export class UserRelatedInfo {
	lastRoute: string;
	id: string;
	datastore_id: string;
}
