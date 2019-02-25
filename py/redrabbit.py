import dbconnect

class Redrabbit:
    
    def getUserByEmail(self, email):
        dbc = dbconnect.DatabaseConnection("user_sps", [email], 1)
        return dbc.executeQuery()
