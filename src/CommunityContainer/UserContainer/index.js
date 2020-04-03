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
	addMember = async (member_fk) => {
		console.log(" member with id: ", member_fk);
		console.log("group id: ", this.props.groupToAddMemberId);

		const member = {
			group_fk: this.props.groupToAddMemberId,
			member_fk: member_fk
		}

		// define our url
		const url = process.env.REACT_APP_API_URL + '/api/v1/members/'

		try {
			// fetch call to add member in the group
			const addMemberResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(member),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const addMemberJson = await addMemberResponse.json()
			console.log(addMemberJson);

		} catch(err) {
			console.error(err);
		}

	}


	render() {
		
		return(
			<Modal size="mini" open={this.state.open}  onClose={this.close}>
				<div className="user-container">
					<h3>Add Member</h3>
					<div>
						<UserListContainer 
							addMember={this.addMember}
							users={this.props.users}
							loggedInUser={this.props.loggedInUser}
						/>
					</div>
					
				</div>
			</Modal>
			)
	}
}




export default UserContainer