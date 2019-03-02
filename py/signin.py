import dbconnect

class Signin:
    def __init__(self, email, password):
        self.email = email
        self.password = password
        self.response = { }

    def login(self):
        if len(self.email) == 0:
            self.response[len(self.response)] = {
                'name': 'email',
                'message': 'Required',
                'success': 0
            }
        elif len(self.password) == 0:
            self.response[len(self.response)] = {
                'name': 'password',
                'message': 'Required',
                'success': 0
            }
            
        # If no errors here, attempt signing
        if len(self.response) == 0:
            dbc = dbconnect.DatabaseConnection('user_login_sps', [self.email, self.password])
            self.response = dbc.executeQuery()
            
            if len(self.response) == 0:
                self.response[0] = {
                    'name': 'unknown',
                    'message': 'Signing failed with an unknown error.',
                    'success': 0
                    }
            else:
                self.response[0]['success'] = 1

        return self.response
