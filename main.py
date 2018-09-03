import webapp2
import urllib2
import os
from datastore import Settings

CLOUD_FUN_URL = Settings.get('CLOUD_FUN_URL') 

class OrderCheckerPage(webapp2.RequestHandler):
    def get(self):
        response = urllib2.urlopen(CLOUD_FUN_URL)

app = webapp2.WSGIApplication([
    ('/order-checker', OrderCheckerPage),
], debug=True)