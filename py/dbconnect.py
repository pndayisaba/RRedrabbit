# import mysql.connector
import pymysql.cursors
import sys
sys.path.insert(0, './config')
import database 

# Get a resultset from the database
# given query parameter
# @param query: database query to be executed

class DatabaseConnection:
    
    # Must be initialized with a query to be executed
    def __init__(self, query, procParams = [ ],  isProcQuery=0):
        self.query = query 
        self.procParams = procParams
        self.isProcQuery = isProcQuery

        # db = mysql.connector.connect(
        self.db = pymysql.connect(
            host     = database.dbConfig['host'],
            user     = database.dbConfig['user'],
            password = database.dbConfig['password'],
            database = database.dbConfig['database'],
            charset  = 'utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )        

    def executeQuery(self):
        dataSet = { }
        dbcursor = self.db.cursor()
        if self.isProcQuery == 1:
            dbcursor.callproc(self.query, self.procParams)
            self.db.commit()
            dataSet = dbcursor.fetchall()
        else:
            dbcursor.execute(self.query)
            self.db.commit()
            dataSet = dbcursor.fetchall()
        return dataSet
