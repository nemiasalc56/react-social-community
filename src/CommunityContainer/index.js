import React, { Component } from 'react'
import './Community.css'
import NewGroupForm from './NewGroupForm'
import GroupListContainer from './GroupListContainer'
import GroupUpdateForm from './GroupUpdateForm'
import UserContainer from './UserContainer'




class Community extends Component {
	constructor() {
		super()

		this.state = {
			groups: [],
			updateGroupId: -1,
			showUsersOpen: false
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
	switcher = () => {
		this.setState({
			updateGroupId: -1
		})
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
		console.log("user is trying to get users");
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
			console.log(usersJson);
			if(usersJson.status === 200) {
				this.setState({showUsersOpen: true})
			}

		} catch(err) {
			console.error(err);
		}
	} 


	render() {

		return(
			<div>
				<header>
					<h1>Social Community</h1>

					<nav>
						<p className="links">Home</p>
						
					</nav>
				</header>


				<div>
					<div className="groupContainer">
						<div className="group-list">
							<GroupListContainer 
								groupToUpdate={this.groupToUpdate}
								groups={this.state.groups}
								deleteGroup={this.deleteGroup}
								getUsers={this.getUsers}
							/>
							
						</div>

						<div className="add-group-contianer">
							<NewGroupForm newGroup={this.newGroup}/>
						</div>
					</div>

					<div className="videoContainer">
					</div>

					<div className="chatContainer">
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

				{this.state.showUsersOpen?
					<UserContainer />
					: null
					}

			</div>
			)
	}
}



export default Community