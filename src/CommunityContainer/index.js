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
const socket = io(`${endPoint}`)




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
			updateUserAccountOpen: false
		}
	}

	componentDidMount() {
		this.getGroups()
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
			console.log(deleteGroupJson);

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
		socket.emit('join', { room }, (error) => {
	      if(error) {
	        alert(error);
	      }
    	})
		console.log("this is after the getGroupToChat");

	}

	getGroupMemberId = (id) => {
		console.log("trying to see the members on group with id: ", id)

		// set the id of the group to see the members
		this.setState({groupMemberListId: id})
	}

	// allow user to update account
	openUpdateAccount = () => {
		console.log("user is trying to update account")
		this.setState({updateUserAccountOpen: true})
	}



	render() {

		return(
			<div>
				<header>
					<h1>Social Community</h1>

					<Dropdown text={this.props.user.first_name}>
					    <Dropdown.Menu>
							<Dropdown.Item text='Update Account' onClick={()=> this.openUpdateAccount()}/>
					    </Dropdown.Menu>
					</Dropdown>

				</header>

				<div>
						

					<div className="video-container">
						<VideoContainer />
					</div>

					<div className="chatContainer">
						{this.state.groupToChatOpen?
						<ChatContainer 
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
										user={this.props.user}
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
						loggedInUser={this.props.user}
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
						user={this.props.user}
						switcher={this.switcher}
					 />
					: null
				}

			</div>
			)
	}
}



export default Community