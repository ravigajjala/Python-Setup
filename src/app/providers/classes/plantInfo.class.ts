export class PlantingInfo {
	finishedTrays: string;
	locatorNumber: string;
	pottedDate: Date;
	houseBay: string;
}

export class ReceivingInfo {
	houseBay: string;
	quantity: number;
	locator: string;
	discarded: number;
	reasonCode: string;
	receivedFromLocation: string;
}

export class SalableInfo {
	discarded: number;
	reasonCode: string;
}

export class AppStoreDelivery {
	totalFlatstoSale: number;
	// routeNumberSale: number[];
	routeNumberSale: number;
	discarded: number;
	reasonCode: string;
	check: boolean;
	delivered: number;
}

export class ShipToInfo {
	quantity: number;
	city: number;
	disableInput: boolean;
}

export class Location {
	code: string;
	datastore_id: string;
	city: string;
	state: string;
	firstName: string;
	lastName: string;
	userEmail: string;
	locatorNumber: number;
	shipToLocations: any[]; // Todo:: Change the type
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
	userGreenHouseLocation: string;
	receivedInfoFromOtherStations: boolean;
	showReceiveButton: boolean;
	receivedButonClicked: boolean;
	docIdOfParentVariety: number;
	screenName: string;
	plugTray: PlugTray;
	plantingInfo: PlantingInfo;
	receivingInfo: ReceivingInfo;
	shipToInfo: ShipToInfo[];
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

export class StoreDeliveryData {
	delivered: number;
	discarded: number;
	reasonCode: string;
	route: number;
	routeone: number;
	routetwo: number;
}
