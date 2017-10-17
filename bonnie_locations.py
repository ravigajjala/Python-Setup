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
import models

class GetLocations(APIRequest):
    def get(self):
        try:
            locations = models.Locations.query().fetch()
            locations = self.to_json(locations)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(locations))
        except Exception as e:
            logging.info(e)

class CreateLocationsDatabase(APIRequest):
    def post(self):
        try:
            locations = json.loads(self.request.body)
            for location in locations:
                final_locations = models.Locations(
                    city=location['city'], state=location['state'])
                final_locations.put()
        except Exception as e:
            logging.error(e)

app = webapp2.WSGIApplication([
    ('/locations/get', GetLocations),
    ('/locations/create', CreateLocationsDatabase)
], debug=True)
