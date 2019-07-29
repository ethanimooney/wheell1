import webapp2
import os
import jinja2
from userModel import Account
from google.appengine.api import users

the_jinja_env = jinja2.Environment(
     loader = jinja2.FileSystemLoader(os.path.dirname(__file__)),
     extensions = ['jinja2.ext.autoescape'],
     undefined = jinja2.StrictUndefined,
     autoescape = True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        landing_template = the_jinja_env.get_template("/templates/index.html")

        login_vars = {
            "login_url": users.create_login_url("/checkuser"),
        }

        self.response.write(landing_template.render(login_vars))

class CheckUser(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()

        if user:
            if not Account.get_by_user(user):
                self.redirect("/register")
            else:
                print("uhh")
                self.redirect("/dashboard")

class RegisterHandler(webapp2.RequestHandler):
    def get(self):
        register_template = the_jinja_env.get_template("/templates/register.html")
        self.response.write(register_template.render())
    def post(self):
        user = users.get_current_user()
        user_id = user.user_id()

        firstNameInput = self.request.get('firstName')
        lastNameInput = self.request.get('lastName')
        emailInput = self.request.get('email')
        passwordInput = self.request.get('password')

        newUser = Account(user_id=user_id, firstName=firstNameInput, lastName=lastNameInput, email=emailInput, password=passwordInput)

        newUser.put()
        print("three")
        self.redirect("/dashboard")

class DashHandler(webapp2.RequestHandler):
    def get(self):
        dash_template = the_jinja_env.get_template("/templates/dashBoard.html")

        logoutUrl = users.create_logout_url("/")

        logout_vars = {
            "logout_url": logoutUrl
        }

        self.response.write(dash_template.render(logout_vars))
    def post(self):
        dash_template = the_jinja_env.get_template("/templates/dashBoard.html")
        self.response.write(dash_template.render())

class PopUpHandler(webapp2.RequestHandler):
    def get(self):
        pass
    def post(self):
        dash_template = the_jinja_env.get_template("/templates/dashboard.html")
        self.response.write(dash_template.render())

class AboutHandler(webapp2.RequestHandler):
    def get(self):
        login_vars = {
            "login_url": users.create_login_url("/checkuser"),
        }
        about_template = the_jinja_env.get_template("/templates/about.html")
        self.response.write(about_template.render(login_vars))

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/register', RegisterHandler),
    ('/checkuser', CheckUser),
    ('/dashboard', DashHandler),
    ('/popup', PopUpHandler),
    ('/about', AboutHandler),
], debug=True)
