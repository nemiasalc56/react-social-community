import React, { Component } from 'react'
import './Community.css'
import io from 'socket.io-client'
import { Dropdown } from 'semantic-ui-react'
import NewGroupForm from './NewGroupForm'
import GroupListContainer from './GroupListContainer'
import GroupUpdateForm from './GroupUpdateForm'
import UserContainer from './UserContainer'
import ChatContainer from './ChatContainer'
import GroupMemberListContainer from './GroupMemberListContainer'
import VideoContainer from './VideoContainer'
import UserUpdateForm from './UserUpdateForm'




const endPoint = process.env.REACT_APP_API_URL





class Community extends Component {
	constructor(props) {
		super(props)

		this.state = {
			groups: [],
			updateGroupId: -1,
			groupToAddMemberId: -1,
			users: [],
			groupToChat: '',
			groupToChatId: -1,
			groupToChatOpen: false,
			messages: [],
			members: [],
			groupMemberListId: -1,
			updateUserAccountOpen: false,
			user: '',
			userSettingsOpen: false,
			socket: null
		}
	}

	componentDidMount() {
		const socket = io.connect(`${endPoint}`)

		this.getGroups()
		this.setState({
			user: this.props.user,
			socket: socket
		})

	}



	// this method will get all the group
	getGroups = async () => {
		// define the url to fetch
		const url = process.env.REACT_APP_API_URL + '/api/v1/groups/'

		try {
			// fetch call
			const groupsResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const groupsJson = await groupsResponse.json()

			if(groupsJson.status === 200) {
				this.setState({groups: groupsJson.data})
			}

		} catch(err) {
			console.error(err);
		}
	}




	// create group method
	newGroup = async (groupInfo) => {
		// define our url
		const url = process.env.REACT_APP_API_URL + '/api/v1/groups/'

		try {
			// fetch call
			const groupResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(groupInfo),
				headers: {
          			'Content-Type': 'application/json'
        		}
			})

			const groupJson = await groupResponse.json()

			if(groupJson.status === 200) {
				const groups = this.state.groups

				// push our new groups in the array of groups
				groups.push(groupJson.data)
				this.setState({
					groups: groups
				})

			}

		} catch(err) {
			console.error(err);
		}
	}

	// get the group to update
	groupToUpdate = (id) => {

		this.setState({
			updateGroupId: id
		})
	}

	updateGroup = async (id, newInfo) => {
		// define our url
		const url = process.env.REACT_APP_API_URL + '/api/v1/groups/' + id

		try {
			// fetch the url
			const groupResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(newInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			// get resolve json
			const groupJson = await groupResponse.json()

			if(groupJson.status === 200) {
				const groups = this.state.groups.map((group) => {

					if(group.id === id){
						return groupJson.data
					} else {
						return group
					}
				})

				this.setState({groups: groups})
			}

		} catch(err) {
			console.error(err);
		}
	}

	// this will close and open components
	switcher = (nameToClose) => {
		this.setState({
			updateGroupId: -1,
			groupToAddMemberId: -1,
			groupMemberListId: -1
		})

		if(nameToClose === "chatContainer") {
			this.getGroups()
			this.setState({groupToChatOpen: false})

		} else if(nameToClose === "updateUserAccountOpen") {
			this.setState({updateUserAccountOpen: false})
		}

	}

	// delete group
	deleteGroup = async (id) => {
		console.log("User is trying to delete a group");
		console.log(id);

		// define our url
		const url = process.env.REACT_APP_API_URL + '/api/v1/groups/' + id

		try {

			// fetch call to delete the group
			const deleteGroupResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const deleteGroupJson = await deleteGroupResponse.json()

			if(deleteGroupJson.status === 200) {
				const groups = this.state.groups
				let index

				for(let i = 0; i < groups.length; i++) {
					if(groups[i].id === id) {
						index = i
					}
				}

				groups.splice(index, 1)
				this.setState({groups: groups})
				
			}

		} catch(err) {
			console.error(err);
		}
	}

	// get users
	getUsers = async () => {
		// define the url
		const url = process.env.REACT_APP_API_URL + '/api/v1/users/'

		try {
			// fetch call that will get the users
			const usersResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const usersJson = await usersResponse.json()

			if(usersJson.status === 200) {
				this.setState({
					showUsersOpen: true,
					users: usersJson.data
				})
			}

		} catch(err) {
			console.error(err);
		}
	}

	 // get the group id that we want to add member
	getGroupId = (id) => {
		this.getUsers()
		this.setState({
			groupToAddMemberId: id
		})
	}

	// group to chat with
	getGroupToChat = (group) => {

		this.setState({
			groupToChat: group,
			groupToChatId: group.id,
			groupToChatOpen: true
		})


		const room = group.id


		// join a room
		this.state.socket.emit('join', { room }, (error) => {
	      if(error) {
	        alert(error);
	      }
    	})

	}

	getGroupMemberId = (id) => {

		// set the id of the group to see the members
		this.setState({groupMemberListId: id})
	}

	// allow user to update account
	openUpdateAccount = () => {
		this.setState({updateUserAccountOpen: true})
	}

	// update method
	updateAccount = async (newUserInfo) => {

		// define url to make fetch call
		const url = process.env.REACT_APP_API_URL + '/api/v1/users/' + this.state.user.id

		try {
			const updateAccountResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(newUserInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const updateAccountJson = await updateAccountResponse.json()

			// if the status is equal to 200 it was successful and we can update user in state
			if(updateAccountJson.status === 200) {
				this.setState({user: updateAccountJson.data})
			}

		} catch(err) {
			console.error(err);
		}
	}


	// Note: we are getting this error from Dropdown
	// "findDOMNode is deprecated in StrictMode. 
	// findDOMNode was passed an instance of RefFindNode which is inside StrictMode."
	// apperently is something to do with the version on semantic ui
	// so we will try to fix it later with when there is a new release.

	render() {

		return(
			<div>
				<header>
					<div className="title">
						<h1>Social Community</h1>
						
					</div>

					<div className="user-name">
						<Dropdown text={this.state.user.first_name}>
						    <Dropdown.Menu>
								<Dropdown.Item text='Update Account' onClick={()=> this.openUpdateAccount()}/>
								<Dropdown.Item text='Logout' onClick={()=> this.props.logout()} />
								<Dropdown.Item text='Delete Account' onClick={()=> this.props.deleteAccount()} />
						    </Dropdown.Menu>
						</Dropdown>			

					</div>

				</header>
					{this.state.userSettingsOpen?
						<div className="user-settings">
							
						</div>
						:null
					}

				<div>
						
					<div className="video-container">
						<VideoContainer />
					</div>

					<div className="chatContainer">
						{this.state.groupToChatOpen?
						<ChatContainer
							socket={this.state.socket} 
							groupToChat={this.state.groupToChat}
							user={this.props.user}
							switcher={this.switcher}
							/>
						:null
						}

						{this.state.groupToChatOpen === false?
							<div className="groupContainers">

								<div className="group-list">
									<GroupListContainer
										groupToUpdate={this.groupToUpdate}
										groups={this.state.groups}
										deleteGroup={this.deleteGroup}
										updateGroup={this.updateGroup}
										getGroupId={this.getGroupId}
										getGroupToChat={this.getGroupToChat}
										user={this.state.user}
										getGroupMemberId={this.getGroupMemberId}

									/>
									
								</div>

								<div className="add-group-contianer">
									<NewGroupForm newGroup={this.newGroup}/>
								</div>

							</div>
							:null
						}
					</div>
			
				</div>

				{this.state.updateGroupId !== -1
					? <GroupUpdateForm 
					switcher={this.switcher}
					groupToEdit={this.state.groups.find((group)=> group.id === this.state.updateGroupId)}
					updateGroup={this.updateGroup}
					/>
					:null
				}

				{this.state.groupToAddMemberId !== -1?
					<UserContainer
						switcher={this.switcher}
						users={this.state.users}
						loggedInUser={this.state.user}
						groupToAddMemberId={this.state.groupToAddMemberId}
						/>
					: null
					}

				{this.state.groupMemberListId !== -1?
					<GroupMemberListContainer 
						groupMemberListId={this.state.groupMemberListId}
						switcher={this.switcher}
					/>
					:null
				}

				{this.state.updateUserAccountOpen?
					<UserUpdateForm 
						user={this.state.user}
						switcher={this.switcher}
						updateAccount={this.updateAccount}
					 />
					: null
				}

			</div>
			)
	}
}



export default Community