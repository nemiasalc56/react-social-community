import React, { Component } from 'react'
import { BrowserRouter as Router,
        Switch,
        Route,
        Link } from 'react-router-dom'
import './Community.css'
import NewGroupForm from './NewGroupForm'
import GroupListContainer from './GroupListContainer'




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
				<Router>
					<header>
						<h1>Social Community</h1>

						<Link className="links" to="/create-group">
							Create Group
						</Link>

						<Link className="links" to="/">
							Home
						</Link>
					</header>

					<h2>Community Container</h2>


					<Route path="/create-group">
						<NewGroupForm newGroup={this.newGroup}/>
						
					</Route>

				</Router>

				<div>
					<div className="groupContainer">
						<GroupListContainer groups={this.state.groups}/>
					</div>

					<div className="videoContainer">
					</div>

					<div className="chatContainer">
					</div>
			
				</div>

			</div>
			)
	}
}



export default Community