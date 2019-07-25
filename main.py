import webapp2
import os
import jinja2
users = {
'firstName': {},
'lastName': {},
'email': {},
'password': {},
}

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
 # TODO:
        firstName = self.request.get('firstName')
        lastName = self.request.get('lastName')
        email = self.request.get('email')
        password = self.request.get('password')

        userLib = {
            "firstName":firstName,
        }

        users['firstName'][0] = firstName

        self.response.write(dash_template.render(userLib))
        self.response.write(users)

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

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/login', LoginHandler),
    ('/dashboard', DashHandler),
], debug=True)
