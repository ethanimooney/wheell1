from google.appengine.ext import ndb

def get_login_msh(email, query):
    if email != 'empty' and email:
        res = query(email)
        return 'Welcome, ' + res.lastName

class User(ndb.Model):
    firstName = ndb.StringProperty(required=True)
    lastName = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)

    @classmethod
    def exist(self, emailInput):
        james = self.query(User.email == emailInput).get()
        return james != None

    @classmethod
    def existPass(self, passwordInput):
        james = self.query(User.password == passwordInput).get()
        return james != None

    @classmethod
    def passCheck(self, passwordInput):
        checking = self.query(User.password == passwordInput).get()
        return checking == None

    @classmethod
    def emailCheck(self, emailInput):
        checking = self.query(User.email == emailInput).get()
        return checking == None

    @classmethod
    def getEmail(self, emailInput):
        email = self.query(User.email == emailInput).get()
        return email
