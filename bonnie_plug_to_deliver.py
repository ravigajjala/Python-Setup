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

from datetime import datetime
import webapp2
from utils import APIRequest
import json
from google.appengine.ext import ndb
import logging
import models

class GetPlugToDeliver(APIRequest):
    def get(self):
        try:
            plug_to_deliver_data = models.PlugToDeliver.query().fetch()
            plug_to_deliver_data = self.to_json(plug_to_deliver_data)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(plug_to_deliver_data))
        except Exception as e:
            logging.info(e)

class CreatePlugToDeliver(APIRequest):
    def post(self):
        try:
            plug_to_deliver = json.loads(self.request.body)
            final_plug_to_deliver_data = models.PlugToDeliver(
                name=plug_to_deliver['name'],
                plugTray=models.PlugTray(
                    plugFlatsReceived=plug_to_deliver['plugTray'].get('plugFlatsReceived', None),
                    dateReceived=plug_to_deliver['plugTray'].get('dateReceived', None),
                    plugFlatsPlotted=plug_to_deliver['plugTray'].get('plugFlatsPlotted', None),
                    plugFlatsDiscarded=plug_to_deliver['plugTray'].get('plugFlatsDiscarded', None),
                    reasonsCode=plug_to_deliver['plugTray'].get('reasonsCode', None),
                    seedLotNumber=plug_to_deliver['plugTray'].get('seedLotNumber', None)
                ),
                plantingInfo=models.PlantingInfo(
                    finishedTrays=plug_to_deliver['plantingInfo'].get('finishedTrays', None),
                    locatorNumber=plug_to_deliver['plantingInfo'].get('locatorNumber', None),
                    pottedDate=plug_to_deliver['plantingInfo'].get('pottedDate', None),
                    houseBay=plug_to_deliver['plantingInfo'].get('houseBay', None)
                ),
                receivingInfo=models.ReceivingInfo(
                    houseBay=plug_to_deliver['receivingInfo'].get('houseBay', None),
                    quantity=plug_to_deliver['receivingInfo'].get('quantity', None),
                    locator=plug_to_deliver['receivingInfo'].get('locator', None),
                    discarded=plug_to_deliver['receivingInfo'].get('discarded', None),
                    reasonCode=plug_to_deliver['receivingInfo'].get('reasonCode', None)
                )
            )
            final_plug_to_deliver_data.put()
        except Exception as e:
            logging.error(e)

class UpdatePlugToDeliver(APIRequest):
    def put(self):
        body = json.loads(self.request.body)
        try:
            # Retriving the entity using datastore_id
            plug_to_deliver = models.PlugToDeliver.get_by_id(body['datastore_id'])
            plug_to_deliver.name = body['name']
            plug_to_deliver.plugTray = body['plugTray']
            # Converting string date obj to date obj
            # if plug_to_deliver['plugTray']['dateReceived'] is not None:
            #     plug_to_deliver['plugTray']['dateReceived'] = datetime.strftime(plug_to_deliver['plugTray']['dateReceived'])
            plug_to_deliver.plantingInfo = body['plantingInfo']
            plug_to_deliver.receivingInfo = body['receivingInfo']
            plug_to_deliver.put()
        except Exception as e:
            logging.error(e)

app=webapp2.WSGIApplication([
    ('/plug-to-deliver/get', GetPlugToDeliver),
    ('/plug-to-deliver/create', CreatePlugToDeliver),
    ('/plug-to-deliver/put', UpdatePlugToDeliver)
], debug=True)
