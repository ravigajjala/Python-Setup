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
from models import UserSetting

class GetUserInfo(APIRequest):
    def get(self):
        try:
            userData = UserSetting.query().fetch()
            userData = self.to_json(userData)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(userData))
        except Exception as e:
            logging.error(e)

class CreateUserInfo(APIRequest):
    def post(self):
        body = json.loads(self.request.body)
        try:
            userData = UserSetting.get_by_id(body['user_id'])
            if userData is None:
                userData = UserSetting(
                    id=body['user_id'],
                    lastRoute=body['lastRoute']
                )
                userData.put()
            else:
                userData.lastRoute = body['lastRoute']
                userData.put()
        except Exception as e:
            logging.error(e)

app = webapp2.WSGIApplication([
    ('/user/get', GetUserInfo),
    ('/user/post', CreateUserInfo)
], debug=True)