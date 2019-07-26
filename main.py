import webapp2
import os
import jinja2
from userModel import User

the_jinja_env = jinja2.Environment(
     loader = jinja2.FileSystemLoader(os.path.dirname(__file__)),
     extensions = ['jinja2.ext.autoescape'],
     undefined = jinja2.StrictUndefined,
     autoescape = True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        landing_template = the_jinja_env.get_template("/templates/index.html")
        self.response.write(landing_template.render())

    def post(self):
        dash_template = the_jinja_env.get_template("/templates/dashBoard.html")

        firstNameInput = self.request.get('firstName')
        lastNameInput = self.request.get('lastName')
        emailInput = self.request.get('email')
        passwordInput = self.request.get('password')

        userLib = {
            "email":emailInput,
        }

        userLib['email'] =  User(firstName=firstNameInput, lastName=lastNameInput, email=emailInput, password=passwordInput).put()

        queryLib = {
            # "firstNameQuery": User.query().filter(User.email == "ethanimooney@gmail.com").fetch().firstName
        }

        self.response.write(dash_template.render(userLib))

class LoginHandler(webapp2.RequestHandler):
    def get(self):
        login_template = the_jinja_env.get_template("/templates/login.html")
        self.response.write(login_template.render())
    def post(self):
        self.response.write("Congrats!")

class DashHandler(webapp2.RequestHandler):
    def get(self):
        dash_template = the_jinja_env.get_template("/templates/dashboard.html")
        self.response.write(dash_template.render())
    def post(self):
        self.response.write("Hello")

class PopUpHandler(webapp2.RequestHandler):
    def get(self):
        pass
    def post(self):
        dash_template = the_jinja_env.get_template("/templates/dashboard.html")
        self.response.write(dash_template.render())

class logoutHandler(webapp2.RequestHandler):
    def get(self):
        login_template = the_jinja_env.get_template("/templates/login.html")
        self.response.write(login_template.render())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/login', LoginHandler),
    ('/dashboard', DashHandler),
    ('/popup', PopUpHandler),
    ('/logout', logoutHandler),
], debug=True)
