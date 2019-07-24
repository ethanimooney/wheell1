import webapp2
import os
import jinja2

the_jinja_env = jinja2.Environment(
     loader = jinja2.FileSystemLoader(os.path.dirname(__file__)),
     extensions = ['jinja2.ext.autoescape'],
     undefined = jinja2.StrictUndefined,
     autoescape = True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        landing_template = the_jinja_env.get_template("/templates/index.html")
        self.response.write(landing_template.render())

class LoginHandler(webapp2.RequestHandler):
    def get(self):
        login_template = the_jinja_env.get_template("/templates/login.html")
        self.response.write(login_template.render())

# class SignUpHandler(webapp2.RequestHandler):
#     def get(self):
#         pass
#     def post(self):
#         pass

class DashHandler(webapp2.RequestHandler):
    def get(self):
        dash_template = the_jinja_env.get_template("/templates/dashBoard.html")
        self.response.write(dash_template.render())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/login', LoginHandler),
    ('/dashboard', DashHandler),
], debug=True)
