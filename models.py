#!/usr/bin/env python

from google.appengine.ext import ndb


# Plants model has the data related to Bonnie plant varieties

class Plants(ndb.Model):
    name = ndb.StringProperty()
    icon = ndb.StringProperty()
    url = ndb.StringProperty()
    color_id = ndb.StringProperty()

class Locations(ndb.Model):
    city = ndb.StringProperty()
    code = ndb.StringProperty()
    state = ndb.StringProperty()
    first_name = ndb.StringProperty()
    last_name = ndb.StringProperty()
    email = ndb.StringProperty()
    locatorNumber = ndb.IntegerProperty()
    shipToLocations = ndb.JsonProperty(repeated=True)
    routes = ndb.IntegerProperty(repeated=True)

class Users(ndb.Model):
    name = ndb.StringProperty()
    city = ndb.StringProperty()
    state = ndb.StringProperty()
    email = ndb.StringProperty()
    code = ndb.StringProperty()

class PlugTray(ndb.Model):
    plugFlatsReceived = ndb.IntegerProperty()
    dateReceived = ndb.StringProperty()
    plugFlatsPotted = ndb.IntegerProperty()
    plugFlatsDiscarded = ndb.IntegerProperty()
    reasonsCode = ndb.StringProperty()
    seedLotNumber = ndb.StringProperty()

class PlantingInfo(ndb.Model):
    finishedTrays = ndb.IntegerProperty()
    locatorNumber = ndb.StringProperty()
    pottedDate = ndb.StringProperty()
    houseBay = ndb.StringProperty()

class ReceivingInfo(ndb.Model):
    quantity = ndb.IntegerProperty()
    locator = ndb.StringProperty()
    discarded = ndb.IntegerProperty()
    reasonCode = ndb.StringProperty()
    receivedFromLocation = ndb.StringProperty()

class SalableInfo(ndb.Model):
    finishedTrays = ndb.IntegerProperty()
    discarded = ndb.IntegerProperty()
    reasonCode = ndb.StringProperty()
    totalFlatsToSale = ndb.IntegerProperty()

class AppStoreDelivery(ndb.Model):
    delivered = ndb.IntegerProperty()
    discarded = ndb.IntegerProperty()
    reasonCode = ndb.StringProperty()
    check = ndb.IntegerProperty()
    routeNumberSale = ndb.JsonProperty(repeated=True)

class PlugToDeliver(ndb.Model):
    name = ndb.StringProperty()
    type = ndb.StringProperty()
    url = ndb.StringProperty()
    color_id = ndb.StringProperty()
    docIdOfParentVariety = ndb.IntegerProperty()
    weekNumber = ndb.IntegerProperty()
    userId = ndb.StringProperty()
    userGreenHouseLocation = ndb.StringProperty()
    receivedInfoFromOtherStations = ndb.BooleanProperty()
    showReceiveButton = ndb.BooleanProperty()
    receivedButonClicked = ndb.BooleanProperty()
    screenName = ndb.StringProperty()
    flatsToSaleAfterShipping = ndb.IntegerProperty()
    plugTray = ndb.StructuredProperty(PlugTray)
    plantingInfo = ndb.StructuredProperty(PlantingInfo)
    receivingInfo = ndb.StructuredProperty(ReceivingInfo)
    shipToInfo = ndb.JsonProperty(repeated=True)
    salableInfo = ndb.StructuredProperty(SalableInfo)
    appStoreDelivery = ndb.StructuredProperty(AppStoreDelivery)

class UserSetting(ndb.Model):
    lastRoute = ndb.StringProperty()