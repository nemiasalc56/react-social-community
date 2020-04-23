## Social Community

An app where the users can create group and chat with that group to stay connect. At the same time the user will be able to search for videos to watch and click one to watch while chatting with others.


## User stories

* User can register
* User can login and logout
* User can Update or delete the account
* User can create, update and delete a group
* Owner of the group can add members to a group
* Owner of the group can remove members from a group

![alt text](https://i.imgur.com/8oCCeJR.png)

## Installation

```
$ create-react-app react-social-community
$ npm install semantic-ui-react semantic-ui-css
$ npm install react-youtube
```


## Tables

![alt text](https://i.imgur.com/9ZTaafK.jpg?1)
![alt text](https://i.imgur.com/cTBL3Y0.jpg?1)


## Wireframes

![alt text](https://i.imgur.com/DSEr0uy.jpg?1)
![alt text](https://i.imgur.com/4yn0nMU.jpg?1)
![alt text](https://i.imgur.com/5C7ztlz.jpg?1)
![alt text](https://i.imgur.com/BUwa4Iv.jpg?1)


## Models 
```
class User(UserMixin, Model):
	first_name = CharField()
	last_name = CharField()
	email = CharField(unique=True)
	password = CharField()



class Group(Model):
	name = CharField()
	owner_fk = ForeignKeyField(User, backref='groups')
	secondary_user_fk = CharField()


class Member(Model):
	group_fk = ForeignKeyField(Group, backref='members')
	member_fk = ForeignKeyField(User, backref='members')


class Chat(Model):
	message = CharField()
	owner_fk = ForeignKeyField(User, backref='chats')
	group_fk = ForeignKeyField(Group, backref='chats')
	created_at = DateTimeField(default=datetime.datetime.now)



class Player(Model):
	name = CharField()
	group_fk = ForeignKeyField(Group, backref='player')
```

## API Routes

-- User
| HTTP method | URL path | Description |
| -----------:|:--------:| ----------:|
| GET | `/users` | list of users |
| POST | `/users/register` | register user |
| POST | `/users/login` | log user in |
| GET | `/users/logout` | log user out |
| PUT | `/users/<id>` | update user |
| DELETE | `/users/<id>` | delete user |


-- Group
| HTTP method | URL path | Description|
| -----------:|:--------:| ----------:|
| GET | `/groups` | list of groups |
| GET | `/groups/<id>` | show a group |
| POST | `/groups` | create a group |
| PUT | `'/groups/<id>' | update a group |
| DELETE | `/groups/<id>` | delete a group |


-- Member
| HTTP method | URL path | Description|
| -----------:|:--------:| ----------:|
| GET | `/members` | list of members |
| POST | `/members` | add a member |
| PUT | `'/members/<id>' | update a member |
| DELETE | `/members/<id>` | delete a member |


-- Chat
| HTTP method | URL path | Description|
| -----------:|:--------:| ----------:|
| GET | `/messages` | list of messages |
| POST | `/messages` | create a message |
| PUT | `'/messages/<id>' | update a message |
| DELETE | `/messages/<id>` | delete a message |



## Nice to have

* Group in the chat will be able to watch the same video at the same time
* Show notifications for new messages
* Allow user to send pictures and videos


## Technology Used

* Youtube API
* Python
* Flask
* React
* Socket.io
