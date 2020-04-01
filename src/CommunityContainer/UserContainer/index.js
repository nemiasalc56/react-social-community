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

	// close method to close the modal
	close = () => {
		this.props.switcher()
	}

	// add a member to a group
	addMember = (id) => {
		console.log("user is trying to add member with id: ", id);
	}


	render() {
		
		return(
			<Modal size="mini" open={this.state.open}  onClose={this.close}>
				<div className="user-container">
					<h3>Add Member</h3>
					<div>
						<UserListContainer 
							addMember={this.addMember}
							users={this.props.users}/>
					</div>
					
				</div>
			</Modal>
			)
	}
}




export default UserContainer