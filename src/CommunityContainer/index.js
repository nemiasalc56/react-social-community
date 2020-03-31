import React, { Component } from 'react'
import { BrowserRouter as Router,
        Switch,
        Route,
        Link } from 'react-router-dom'
import NewGroupForm from './NewGroupForm'
import './Community.css'




class Community extends Component {
	constructor() {
		super()

		this.state = {
			groups: []
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
					{/* <div className="groupContainer"> */}
					{/* </div> */}

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