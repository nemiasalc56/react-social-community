import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import './GroupMemberList.css'
import MemberList from './MemberList'


class GroupMemberListContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: true,
			members: []
		}
	}

	componentDidMount() {
		this.getMembers()
	}

	// close modal
	close = () => {
		this.props.switcher()
	}

	getMembers = async () => {
		console.log("trying to get members");
		// define the url
		const url = process.env.REACT_APP_API_URL + '/api/v1/members/' + this.props.groupMemberListId

		try {

			const membersResponse = await fetch(url, {
				credentials: 'include',
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const membersJson = await membersResponse.json()

			console.log(membersJson);

			if(membersJson.status === 200) {
				this.setState({members: membersJson.data})
			}

		} catch(err) {
			console.error(err);
		}

	}

	// remove a member
	removeMember = async (memberId) => {
		console.log("user is trying to remove member with id: ", memberId);
		// define the url
		const url = process.env.REACT_APP_API_URL + '/api/v1/members/' + memberId

		try {
			// fetch call to remove member
			const removeMemberResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const removeMemberJson = await removeMemberResponse.json()
			console.log(removeMemberJson);

			if(removeMemberJson.status === 200) {
				const members = this.state.members
				let index

				for(let i = 0; i < members.length; i++) {
					if(members[i].id === memberId) {
						index = i
					}
				}

				members.splice(index, 1)
				this.setState({members: members})

			}

		} catch(err) {
			console.error(err);
		}

	}

	render() {

		return(
			<Modal size="mini" open={this.state.open} onClose={this.close}>
				<div className="member-list">
					<h3>GroupMemberListContainer</h3>
					<MemberList 
						removeMember={this.removeMember}
						members={this.state.members}/>
				</div>
			</Modal>
			)

	}
}




export default GroupMemberListContainer