import webapp2
import json
from google.appengine.ext import ndb
from datetime import datetime

DEFAULT_TIME_FORMAT = '%Y-%m-%dT%H:%M:%S.%fZ'

class APIRequest(webapp2.RequestHandler):
    def to_json(self, o):
        if isinstance(o, list):
            print o
            print 'list'
            return [self.to_json(l) for l in o]
        if isinstance(o, dict):
            print 'dict'
            x = {}
            for l in o:
                x[l] = self.to_json(o[l])
            return x
        if isinstance(o, datetime):
            return o.strftime(DEFAULT_TIME_FORMAT)
        if isinstance(o, ndb.Key):
            return o.urlsafe()
        if isinstance(o, ndb.Model):
            print 'model'
            dct = o.to_dict()
            dct['datastore_id'] = o.key.id()
            return self.to_json(dct)
        return o