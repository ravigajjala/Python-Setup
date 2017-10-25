#!/usr/bin/env python

from google.appengine.ext import ndb


# Plants model has the data related to Bonnie plant varieties

class Plants(ndb.Model):
    name = ndb.StringProperty()
    icon = ndb.StringProperty()

class Locations(ndb.Model):
    city = ndb.StringProperty()
    state = ndb.StringProperty()
    firstName = ndb.StringProperty()
    lastName = ndb.StringProperty()
    userEmail = ndb.StringProperty()
    locatorNumber = ndb.IntegerProperty()

class Users(ndb.Model):
    name = ndb.StringProperty()
    city = ndb.StringProperty()
    state = ndb.StringProperty()
    email = ndb.StringProperty()
    code = ndb.StringProperty()

class PlugTray(ndb.Model):
    plugFlatsReceived = ndb.IntegerProperty()
    dateReceived = ndb.StringProperty()
    plugFlatsPlotted = ndb.IntegerProperty()
    plugFlatsDiscarded = ndb.IntegerProperty()
    reasonsCode = ndb.StringProperty()
    seedLotNumber = ndb.StringProperty()

class PlantingInfo(ndb.Model):
    finishedTrays = ndb.IntegerProperty()
    locatorNumber = ndb.StringProperty()
    pottedDate = ndb.StringProperty()
    houseBay = ndb.IntegerProperty()

class ReceivingInfo(ndb.Model):
    houseBay = ndb.StringProperty()
    quantity = ndb.IntegerProperty()
    locator = ndb.StringProperty()
    discarded = ndb.IntegerProperty()
    reasonCode = ndb.StringProperty()

class SalableInfo(ndb.Model):
    discarded = ndb.IntegerProperty()
    reasonCode = ndb.StringProperty()
    totalFlatsToSale = ndb.StringProperty()

class AppStoreDelivery(ndb.Model):
    delivered = ndb.IntegerProperty()
    routeNumberSale = ndb.IntegerProperty()
    routeNumberSaleOne = ndb.IntegerProperty()
    routeNumberSaleTwo = ndb.IntegerProperty()
    discarded = ndb.IntegerProperty()
    reasonCode = ndb.StringProperty()
    check = ndb.IntegerProperty()

class PlugToDeliver(ndb.Model):
    name = ndb.StringProperty()
    userId = ndb.StringProperty()
    plugTray = ndb.StructuredProperty(PlugTray)
    plantingInfo = ndb.StructuredProperty(PlantingInfo)
    receivingInfo = ndb.StructuredProperty(ReceivingInfo)
    salableInfo = ndb.StructuredProperty(SalableInfo)
    appStoreDelivery = ndb.StructuredProperty(AppStoreDelivery)
    
class UserSetting(ndb.Model):
    lastRoute = ndb.StringProperty()