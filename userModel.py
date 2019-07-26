
from google.appengine.ext import ndb

class User(ndb.Model):
    firstName = ndb.StringProperty(required=True)
    lastName = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)

    @classmethod
    def exist(self, emailInput):
        james = self.query(User.email == emailInput).get()
        return james != None
