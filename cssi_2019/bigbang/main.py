import webapp2
import jinja2
import os
from google.appengine.api import users

the_jinja_env = jinja2.Environment(
     loader = jinja2.FileSystemLoader(os.path.dirname(__file__)),
     extensions = ['jinja2.ext.autoescape'],
     undefined = jinja2.StrictUndefined,
     autoescape = True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        # main_template = the_jinja_env.get_template("/templates/index.html")
        # self.response.write(main_template.render())
        user = users.get_current_user()
        if user: #if logged in
            self.redirect("/reciever")
        else: #if not logged in
            self.redirect("/nouser")
    def post(self):
        pass

class NoUserHandler(webapp2.RequestHandler):
    def get(self):
        login_url = users.create_login_url("/")
        self.response.write('You are not logged in!<br>Login here: <a href="' + login_url + '">Click Here</a>')

class RecieverHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        nickname = user.nickname()
        template_vars = {
            "nameInput": nickname,
        }
        post_template = the_jinja_env.get_template("/templates/starter_page.html")
        self.response.write(post_template.render(template_vars))
    def post(self):
        pass
        # template_vars = {
        #     "nameInput": self.request.POST["nameInput"],
        # }
        # post_template = the_jinja_env.get_template("/templates/starter_page.html")
        # self.response.write(post_template.render(template_vars))

class ImportanceHandler(webapp2.RequestHandler):
    def get(self):
        importance_template = the_jinja_env.get_template("/templates/importance.html")
        self.response.write(importance_template.render())
    def post(self):
        pass


app = webapp2.WSGIApplication([
    ("/", MainHandler),
    ("/reciever", RecieverHandler),
    ("/importance", ImportanceHandler),
    ("/nouser", NoUserHandler),
], debug=True)
