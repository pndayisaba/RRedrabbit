import json
import dbconnect
import redrabbit

class Signup:
    # Signup data
    data = { }
    # Required fields
    requiredFields = ['email', 'password','password2']
    # Track errors
    response = { }

    def __init__(self, strJson):
        print('strJson: ' +strJson)
        self.data = json.loads(strJson)

    def registerUser(self):
        dic = dict(self.data)

        # Check for required fields first
        for rf in self.requiredFields:
            if rf not in dic:
                self.response[len(self.response)] = {"name":rf, "message":"Required", "success":"0"}
        
        # Check for password match
        if len(self.response) == 0:
            if self.data['password'] != self.data['password2']:
                self.response[len(self.response)] = {"name":"password", "message":"Password does not match!", "success":"0"}
        
        # Check that user doesn't exist
        rr = redrabbit.Redrabbit()
        userInfo = rr.getUserByEmail(self.data['email'])
        print("userLen: ")
        print(len(userInfo))
        if len(userInfo):
            self.response = {
                "name": "email", 
                "message": "This email is already registered! Please sign in or use a different email.", 
                "success": 0
            }
        
        # If no errors at this point, try registering user
        if not len(self.response):
            print("No errors! Will now create a new user.")
            dbc = dbconnect.DatabaseConnection(
                'add_user_spi', 
                [self.data['first_name'], self.data['last_name'], self.data['email'], self.data['password']],
                1
                )
            result = dbc.executeQuery()
            print("[Signup] result: ")
            print(result)
            
            if len(result) and result[0]['success'] == 1:
                self.response = {
                    "success": 1,
                    "message": "OK"
                }
            else:
                self.response = {"success": 0, "message": "Failed"}
        
        return self.response
