import React, { Component } from 'react'
import { BrowserRouter as Router,
        Switch,
        Route,
        Link } from 'react-router-dom'
import NewGroupForm from './NewGroupForm'
import './Community.css'




class Community extends Component {


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
						<NewGroupForm />
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