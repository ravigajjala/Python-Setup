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
import models

class GetUsers(APIRequest):
    def get(self):
        try:
            users = models.Users.query().fetch()
            users = self.to_json(users)
            self.response.headers['Content-Type'] = 'application/json'
            self.response.out.write(json.dumps(users))
        except Exception as e:
            logging.info(e)

class CreateUser(APIRequest):
    def post(self):
        try:
            users = json.loads(self.request.body)
            for user in users:
                final_users = models.Users(
                    name=user['name'], city=user['city'], state=user['state'], email=user['email'], code=user['code'])
                final_users.put()
        except Exception as e:
            logging.error(e)

app = webapp2.WSGIApplication([
    ('/users/get', GetUsers),
    ('/users/create', CreateUser)
], debug=True)
