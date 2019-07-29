import webapp2
import jinja2
import os

the_jinja_env = jinja2.Environment(
     loader = jinja2.FileSystemLoader(os.path.dirname(__file__)),
     extensions = ['jinja2.ext.autoescape'],
     undefined = jinja2.StrictUndefined,
     autoescape = True)

#Handler Section
class MainPage(webapp2.RequestHandler):
    def get(self):
        welcome_template = the_jinja_env.get_template('/templates/welcome.html')
        self.response.write(welcome_template.render())

    def post(self):
        meme_result_template = the_jinja_env.get_template('/templates/meme-result.html')
        template_vars = {
            "img_url": self.request.POST["urlInput"],
            "line_one": self.request.POST["firstL"],
            "line_two": self.request.POST["secondL"],
        }
        self.response.write(meme_result_template.render(template_vars))

class MemeResult(webapp2.RequestHandler):
    def get(self):
        meme_result_template = the_jinja_env.get_template('/templates/meme-result.html')
        template_vars = {
            "img_url": "https://publicdomainpictures.net/pictures/90000/velka/alpaca-chewing.jpg",
            "line_one": 'Hello World,',
            "line_two": 'how are you?'
        }
        self.response.write(meme_result_template.render(template_vars))

#App Config Section
app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/memeresult', MemeResult),
], debug = True)
