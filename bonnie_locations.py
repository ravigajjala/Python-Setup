# Copyright 2013 Google, Inc
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#             http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import webapp2
from utils import APIRequest
import json
from google.appengine.ext import ndb
import logging
from models import Locations

class GetLocations(APIRequest):
    def get(self):
        try:
            locations = Locations.query().fetch()
            locations = self.to_json(locations)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(locations))
        except Exception as e:
            logging.error(e)

class CreateLocationsDatabase(APIRequest):
    def post(self):
        try:
            locations = json.loads(self.request.body)
            for location in locations:
                final_locations = Locations(
                    code=location['code'],
                    city=location['city'],
                    state=location['state'],
                    first_name=location.get('first_name', None),
                    last_name=location.get('last_name', None),
                    email=location.get('email', None),
                    locatorNumber=location.get('locatorNumber', None),
                    shipToLocations=location['shipToLocations'],
                    routes=location.get('routes', []))
                final_locations.put()
        except Exception as e:
            logging.error(e)

class UpdateLocationsDatabase(APIRequest):
    def put(self):
        body = json.loads(self.request.body)
        try:
            # Retriving the entity using datastore_id
            location = Locations.get_by_id(body['datastore_id'])
            location.code=body['code']
            location.city = body['city']
            location.state = body['state']
            location.first_name = body['first_name']
            location.last_name = body['last_name']
            location.email = body['email']
            location.locatorNumber = body['locatorNumber']
            location.shipToLocations = body['shipToLocations']
            location.routes = body['routes']
            location.put()
        except Exception as e:
            logging.error(e)

app = webapp2.WSGIApplication([
    ('/locations/get', GetLocations),
    ('/locations/create', CreateLocationsDatabase),
    ('/locations/put', UpdateLocationsDatabase)
], debug=True)