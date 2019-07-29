import webapp2

#Handler Section
class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        self.response.write('<h1 style="color: lightgreen">Hello World!</h1>')
class SecretPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        self.response.write('<h2 style="color: lightblue">You found the secret page!</h2>')

#App Config Section
app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/secret', SecretPage),
], debug=True)
