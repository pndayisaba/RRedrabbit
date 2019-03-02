import json
import dbconnect
import redrabbit

class Forum(redrabbit.Redrabbit):
    requiredFields = ['email', 'description']
    response = { }

    def __init__(self, strJson):
        self.data = dict(json.loads(strJson))
        
        # Check for save type;
        if 'save_type' not in self.data:
            self.responese[len(self.response)] = {
                'name':'save_type',
                'message': 'save_type must be specified but was not provided.',
                'success': 0
            }
        elif self.data['save_type'] == 'new':
            # Require [title, description] for new post
            self.requiredFields.append('title')
            self.requiredFields.append('description')

        elif self.data['save_type'] == 'reply' or self.data['save_type'] == 'edit' or self.data['save_type'] == 'delete':
            # Require [forum_id, description] when replying, editing, or deleting post
            self.requiredFields.append('forum_id')
            self.requiredFields.append('description')

        else:
            # Check for required fields
            for rf in self.requiredFields:
                if rf not in self.data:
                    self.response[len(self.response)] = {
                        'name': rf,
                        'message': 'Required',
                        'success': 0
                    }
            
            # Set default values for missing fields
            if 'title' not in self.data:
                self.data['title'] = None
            if 'forum_id' not in self.data:
                self.data['forum_id'] = None

        # Initialize data saving...
        self.runSave()

    def runSave(self):
        if len(self.data) == 0:
            self.response[0] = {
                'name': 'Unknown',
                'message': 'Data is missing. Nothing to save.',
                'success': 0
            }

        return self.response if len(self.response) > 0 else self.savePost()

    def savePost(self):

        if len(self.response) > 0:
            return self.response

        # Check whether user exists
        userInfo = super(Forum, self).getUserByEmail(self.data['email'])
        if len(userInfo) == 0:
            self.response = {
                'name': 'email',
                'message': 'User does not exist.',
                'success': 0
            }
        elif self.data['save_type'] == 'new' or self.data['save_type'] == 'reply':
            # Create new database entry
            params = [
                self.data['title'], 
                self.data['description'], 
                self.data['email'], 
                self.data['forum_id']
            ]
            dbc = dbconnect.DatabaseConnection('forum_spi',params)
            newEntry = dbc.executeQuery()
            if len(newEntry) == 0:
                self.response[len(self.response)] = {
                    'name': 'Unknown',
                    'message': 'Could not create a new post.',
                    'success': 0
                }
            else:
                self.response = newEntry
                self.response[0]['success'] = 1

        elif self.data['save_type'] == 'edit':
            params = [
                self.data['title'], 
                self.data['description'], 
                self.data['email'], 
                self.data['forum_id']
            ]

            dbc = dbconnect.DatabaseConnection('forum_spu', params)
            update = dbc.executeQuery()
            if len(update) == 0 or update[0]['success'] == 0
                self.response[len(self.response)] = {
                    'name': 'Unknown',
                    'message': 'Could not save changes. Error unknown',
                    'success': 0
                }
            else:
                update[0]['name'] = 'Unknown'
                update[0]['message'] = 'Changes saved successfully.',
                update[0]['success'] = 1
                
                self.response[len(self.response)] = update[0]

        elif self.data['save_type'] == 'delete':
            params = [self.data['email'], self.data['forum_id']]
            dbc = dbconnect.DatabaseConnection('forum_spd', params)
            update = dbc.executeQuery()
            
            if len(update) == 0 or update[0]['success'] == 0
                self.response[len(self.response)] = {
                    'name': 'Unknown',
                    'message': 'Could not delete post. Error unknown',
                    'success': 0
                }
            else:
                update[0]['name'] = 'Unknown'
                update[0]['message'] = 'Post deleted successfully.',
                update[0]['success'] = 1

                self.response[len(self.response)] = update[0]

        return self.response


