class createAccount(webapp2.RequestHandler):
    def get(self, firstName, lastName, email, password):
        self.firstName = self.request.get('firstName')
        self.lastName = self.request.get('lastName')
        self.email = self.request.get('email')
        self.password = self.request.get('password')

    users = {'firstName': {}, 'lastName': {}, 'email': {}, 'password': {}}
        for i in range (len(users) + 2):
            if i > len(users):
                firstName.update(self.firstName)
                lastName.update(self.lastName)
                email.update(self.email)
                password.update(self.password)
      def post(self):
          print("done!")
