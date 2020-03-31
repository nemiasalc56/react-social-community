import React, { Component } from 'react'
import './Community.css'
import NewGroupForm from './NewGroupForm'
import GroupListContainer from './GroupListContainer'
import GroupUpdateForm from './GroupUpdateForm'




class Community extends Component {
	constructor() {
		super()

		this.state = {
			groups: []
		}
	}

	componentDidMount() {
		this.getGroups()
	}


	// this method will get all the group
	getGroups = async () => {
		console.log("getGroups");
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
			console.log(groupsJson);

			if(groupsJson.status === 200) {
				this.setState({groups: groupsJson.data})
			}


		} catch(err) {
			console.error(err);
		}
	}




	// create group method
	newGroup = async (groupInfo) => {
		console.log(groupInfo);
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
			console.log(groupJson);

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
							<GroupListContainer groups={this.state.groups}/>
							
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

				<GroupUpdateForm />

			</div>
			)
	}
}



export default Community