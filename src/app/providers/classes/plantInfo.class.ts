export class PlantingInfo {
	finishedTrays: string;
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
}

export class AppStoreDelivery {
	totalFlatstoSale: number;
	// routeNumberSale: number[];
	routeNumberSale: number;
	routeNumberSaleOne: number;
	routeNumberSaleTwo: number;
	discarded: number;
	reasonCode: string;
	check: boolean;
	delivered: number;
}

export class ShipTo {
	locationValues: number[];
}

export class Location {
	datastore_id
	city: string;
	state: string;
	firstName: string;
	lastName: string;
	userEmail: string;
	locatorNumber: number;
}

export class Plant {
	id: string;
	name: string;
	icon: string;
}

export class User {
	id: string;
	name: string;
	city: string;
	state: string;
	email: string;
}

export class PlugToDeliver {
	weekNumber: number;
	name: string;
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
	plugFlatsPlotted: number;
	plugFlatsDiscarded: number;
	reasonsCode: string;
	seedLotNumber: string;
}

export class ShipToInfo {
	[name: string]: number;
}

export class UserRelatedInfo {
	lastRoute: string;
	id: string;
	datastore_id: string;
}
