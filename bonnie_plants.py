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

import datetime
import webapp2
from utils import APIRequest
import json
from google.appengine.ext import ndb
import logging
from models import Plants

class GetPlants(APIRequest):
    def get(self):
        try:
            plants = Plants.query().fetch()
            plant_varieties = self.to_json(plants)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(plant_varieties))
        except Exception as e:
            logging.error(e)

class CreatePlantsDatabase(APIRequest):
    def post(self):
        try:
            plant_varieties = json.loads(self.request.body)
            for plant_variety in plant_varieties:
                plants = Plants(
                    name=plant_variety['name'], icon=plant_variety['icon'])
                plants.put()
        except Exception as e:
            logging.error(e)


app = webapp2.WSGIApplication([
    ('/plants/get', GetPlants),
    ('/plants/create', CreatePlantsDatabase)
], debug=True)