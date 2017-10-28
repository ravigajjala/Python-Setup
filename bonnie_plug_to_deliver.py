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
from models import PlugToDeliver, PlugTray, ReceivingInfo, PlantingInfo, ShipToInfo, SalableInfo, AppStoreDelivery

class GetPlugToDeliver(APIRequest):
    def get(self):
        try:
            # retriving the request parameters to get the requesed user id
            params = self.request.params

            # querying by user id
            plug_to_deliver_data = PlugToDeliver.query(PlugToDeliver.userGreenHouseLocation == params.get('userGreenHouseLocation')).fetch()
            plug_to_deliver_data = self.to_json(plug_to_deliver_data)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(plug_to_deliver_data))
        except Exception as e:
            logging.error(e)

class CreatePlugToDeliver(APIRequest):
    def post(self):
        try:
            plug_to_deliver = json.loads(self.request.body)
            print plug_to_deliver
            final_plug_to_deliver_data = PlugToDeliver(
                name=plug_to_deliver['name'],
                type=plug_to_deliver['type'],
                userId=plug_to_deliver['userId'],
                url=plug_to_deliver['url'],
                color_id=plug_to_deliver['color_id'],
                weekNumber=plug_to_deliver.get('weekNumber', None),
                userGreenHouseLocation=plug_to_deliver['userGreenHouseLocation'],
                receivedInfoFromOtherStations=plug_to_deliver.get('receivedInfoFromOtherStations', None),
                plugTray=PlugTray(
                    plugFlatsReceived=plug_to_deliver['plugTray'].get('plugFlatsReceived', None),
                    dateReceived=plug_to_deliver['plugTray'].get('dateReceived', None),
                    plugFlatsPlotted=plug_to_deliver['plugTray'].get('plugFlatsPlotted', None),
                    plugFlatsDiscarded=plug_to_deliver['plugTray'].get('plugFlatsDiscarded', None),
                    reasonsCode=plug_to_deliver['plugTray'].get('reasonsCode', None),
                    seedLotNumber=plug_to_deliver['plugTray'].get('seedLotNumber', None)
                ),
                plantingInfo=PlantingInfo(
                    finishedTrays=plug_to_deliver['plantingInfo'].get('finishedTrays', None),
                    locatorNumber=plug_to_deliver['plantingInfo'].get('locatorNumber', None),
                    pottedDate=plug_to_deliver['plantingInfo'].get('pottedDate', None),
                    houseBay=plug_to_deliver['plantingInfo'].get('houseBay', None)
                ),
                receivingInfo=ReceivingInfo(
                    houseBay=plug_to_deliver['receivingInfo'].get('houseBay', None),
                    quantity=plug_to_deliver['receivingInfo'].get('quantity', None),
                    locator=plug_to_deliver['receivingInfo'].get('locator', None),
                    discarded=plug_to_deliver['receivingInfo'].get('discarded', None),
                    reasonCode=plug_to_deliver['receivingInfo'].get('reasonCode', None)
                ),
                shipToInfo=ShipToInfo(
                    locatorNumber=plug_to_deliver['shipToInfo'].get('locatorNumber', None)
                ),
                salableInfo=SalableInfo(
                    discarded=plug_to_deliver['salableInfo'].get('discarded', None),
                    reasonCode=plug_to_deliver['salableInfo'].get('reasonCode', None),
                    totalFlatsToSale=plug_to_deliver['salableInfo'].get('reasonCode', None)
                ),
                appStoreDelivery=AppStoreDelivery(
                    delivered=plug_to_deliver['appStoreDelivery'].get('delivered', None),
                    discarded=plug_to_deliver['appStoreDelivery'].get('discarded', None),
                    reasonCode=plug_to_deliver['appStoreDelivery'].get('reasonCode', None),
	                check=plug_to_deliver['appStoreDelivery'].get('check', None),
                    deliveryQuantity=plug_to_deliver['appStoreDelivery'].get('deliveryQuantity',[])
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
            plug_to_deliver = PlugToDeliver.get_by_id(body['datastore_id'])
            plug_to_deliver.name = body['name']
            plug_to_deliver.type = body['type']
            plug_to_deliver.color_id = body['color_id']
            plug_to_deliver.url = body['url']
            plug_to_deliver.weekNumber = body['weekNumber']
            plug_to_deliver.userId = body['userId']
            plug_to_deliver.userGreenHouseLocation=body['userGreenHouseLocation']
            plug_to_deliver.plugTray = body['plugTray']
            plug_to_deliver.salableInfo = body['salableInfo']
            plug_to_deliver.appStoreDelivery = body['appStoreDelivery']
            # TODO: Converting string date obj to date obj
            # if plug_to_deliver.plugTray.dateReceived is not None:
            #     print  plug_to_deliver.plugTray.dateReceived
            #     plug_to_deliver.plugTray.dateReceived = datetime.strftime(plug_to_deliver.plugTray.dateReceived, '%m/%d/%Y')
            plug_to_deliver.plantingInfo = body['plantingInfo']
            plug_to_deliver.receivingInfo = body['receivingInfo']
            plug_to_deliver.shipToInfo = body['shipToInfo']
            plug_to_deliver.put()
        except Exception as e:
            logging.error(e)

app=webapp2.WSGIApplication([
    ('/plug-to-deliver/get', GetPlugToDeliver),
    ('/plug-to-deliver/create', CreatePlugToDeliver),
    ('/plug-to-deliver/put', UpdatePlugToDeliver)
], debug=True)