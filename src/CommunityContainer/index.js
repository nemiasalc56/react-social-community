import React, { Component } from 'react'
import { BrowserRouter as Router,
        Switch,
        Route,
        Link } from 'react-router-dom'
import './Community.css'




class Community extends Component {


	render() {

		return(
			<div>
				<Router>
					<header>
						<h1>Social Community</h1>

						<Link to="/create-group">
							Create Group
						</Link>

						<Link to="/">
							Home
						</Link>
					</header>

					<h2>Community Container</h2>

					<Route path="/">
						<div>
							<div className="groupContainer">
							</div>

							<div className="videoContainer">
							</div>

							<div className="chatContainer">
							</div>
							
						</div>
						
					</Route>

				</Router>



			</div>
			)
	}
}



export default Community