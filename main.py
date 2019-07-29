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
        print("bobbbb")
        landing_template = the_jinja_env.get_template("/templates/index.html")
        print("kaleree")
        self.response.write(landing_template.render())

    def post(self):
        landing_template = the_jinja_env.get_template("/templates/index.html")
        dash_template = the_jinja_env.get_template("/templates/dashBoard.html")
        print("hello")

        firstNameInput = self.request.get('firstName')
        lastNameInput = self.request.get('lastName')
        emailInput = self.request.get('email')
        passwordInput = self.request.get('password')

        userLib = {
            "email":emailInput,
        }
        queryLib={
            'firstNameQuery': User.query(User.email == emailInput).get()
        }
        if User.exist(emailInput):
            print("This email already exists")
            self.response.write(landing_template.render())
        elif User.existPass(passwordInput):
            print("This password already exists")
            self.response.write(landing_template.render())
        else:
            print("create")
            userLib['email'] =  User(firstName=firstNameInput,
            lastName=lastNameInput,password=passwordInput,email=emailInput).put()
            # else:
            #     print("This password and email already exists")
            # email=emailInput,
            # password=passwordInput).put()
            self.response.headers.add_header('Set-Cookie', 'email=' + str(emailInput))
            self.response.write(dash_template.render(queryLib))




        # queryLib = {
        #                                                 # TODO: make this get current logged in user
        #     "firstNameQuery": User.query().filter(User.email == "ethanimooney@gmail.com").fetch()[0].firstName
        # }

        # self.response.write(dash_template.render(queryLib))

class LoginHandler(webapp2.RequestHandler):
    def get(self):
        login_template = the_jinja_env.get_template("/templates/login.html")
        self.response.write(login_template.render())

        # login_template = the_jinja_env.get_template("/templates/login.html")
        # self.response.write(login_template.render())
    def post(self):
        dash_template = the_jinja_env.get_template("/templates/dashBoard.html")
        login_template = the_jinja_env.get_template("/templates/login.html")

        emailInput = self.request.get('email')
        passwordInput = self.request.get('password')

        print("About to start")

        if User.exist(emailInput) == None and User.existPass(passwordInput) == None:
            print("Wrong")
            self.response.write(login_template.render())
            print("WRONG")
        else:
            if User.exist(emailInput):
                print("first one")
                if User.existPass(passwordInput):
                    print("You have signed in correctly")
                    self.response.write(dash_template.render())
                    self.response.headers.add_header('Set-Cookie', 'email=' + str(User.getEmail()))
        # if User.emailCheck(emailInput) and User.passCheck(passwordInput):
        #     print("Does work")
        #     self.response.write(dash_template.render())
        #     print("Works")
        #     self.response.headers.add_header('Set-Cookie', 'email=' + str(User.getEmail()))




class DashHandler(webapp2.RequestHandler):
    def get(self):
        email = self.request.cookies.get('email')
        # if User.getEmail == email
        dash_template = the_jinja_env.get_template("/templates/dashboard.html")
        self.response.write(dash_template.render())
    def post(self):
        dash_template = the_jinja_env.get_template("/templates/dashboard.html")
        self.response.write(dash_template.render())

class PopUpHandler(webapp2.RequestHandler):
    def get(self):
        pass
    def post(self):
        dash_template = the_jinja_env.get_template("/templates/dashboard.html")
        self.response.write(dash_template.render())

class LogOutHandler(webapp2.RequestHandler):
    def get(self):
        pass
    def post(self):
        self.response.headers.add_header('Set-Cookie', 'email=' + 'empty')
        logout_template = the_jinja_env.get_template("/templates/login.html")
        self.response.write(logout_template.render())

class AboutHandler(webapp2.RequestHandler):
    def get(self):
        about_template = the_jinja_env.get_template("/templates/about.html")
        self.response.write(about_template.render())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/login', LoginHandler),
    ('/dashboard', DashHandler),
    ('/popup', PopUpHandler),
    ('/logout', LogOutHandler),
    ('/about', AboutHandler),
], debug=True)
