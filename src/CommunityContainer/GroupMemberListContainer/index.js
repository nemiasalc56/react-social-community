import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import './GroupMemberList.css'
import MemberList from './MemberList'


class GroupMemberListContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: true,
			members: [],
			groupName: ''
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

			if(membersJson.status === 200) {
				this.setState({
					members: membersJson.data,
					groupName: membersJson.data[0].group_fk.name
				})
			}

		} catch(err) {
			console.error(err);
		}

	}

	// remove a member
	removeMember = async (memberId) => {
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
					<h2>{this.state.groupName}</h2>
					<MemberList 
						removeMember={this.removeMember}
						members={this.state.members}/>
				</div>
			</Modal>
			)

	}
}




export default GroupMemberListContainer