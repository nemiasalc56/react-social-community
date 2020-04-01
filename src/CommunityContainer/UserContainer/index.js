import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import UserListContainer from '../UserListContainer'
import './UserContainer.css'


class UserContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: true
		}
	}




	render() {
		
		return(
			<Modal size="mini" open={this.state.open}>
				<div className="user-container">
					<h3>UserContainer</h3>
					<UserListContainer users={this.props.users}/>
					
				</div>
			</Modal>
			)
	}
}




export default UserContainer