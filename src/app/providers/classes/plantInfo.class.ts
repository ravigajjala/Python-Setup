export class PlantingInfo {
	finishedTrays: number;
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
	finishedTrays: number;
	discarded: number;
	reasonCode: string;
	totalFlatsToSale: any;
}

export class AppStoreDelivery {
	routeNumberSale: Route[];
	discarded: number;
	reasonCode: string;
	check: number;
	delivered: number;
}

export class Route {
	route: number;
	value: number;
}

export class ShipToInfo {
	qty: number;
	city: string;
	state: string;
	disableInput: boolean;
}

export class Location {
	code: string;
	datastore_id: string;
	city: string;
	state: string;
	first_name: string;
	last_name: string;
	email: string;
	locatorNumber: number;
	shipToLocations: ShipToLocationInfo[]; // Todo:: Change the type
	routes: any[];
}

export class ShipToLocationInfo {
	city: string;
	state: string;
	firstName: string;
	lastName: string;
	userEmail: string;
	locatorNumber: number;
	totalShipToQuantities: number;
}

export class Plant {
	datastore_id: number;
	name: string;
	icon: string;
	url: string;
	color_id: string;
	organic: boolean;
	varietyType: string;
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
	varietyType: string;
	deliverdTotal: number;
	userGreenHouseLocation: string;
	receivedInfoFromOtherStations: boolean;
	showReceiveButton: boolean;
	receivedButonClicked: boolean;
	docIdOfParentVariety: number;
	screenName: string;
	flatsToSaleAfterShipping: number;
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
