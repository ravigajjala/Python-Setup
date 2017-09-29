#!/usr/bin/env python

from google.appengine.ext import ndb


# Plants model has the data related to Bonnie plant varieties

class Plants(ndb.Model):
    name = ndb.StringProperty()
    icon = ndb.StringProperty()

class Locations(ndb.Model):
    city = ndb.StringProperty()
    state = ndb.StringProperty()
