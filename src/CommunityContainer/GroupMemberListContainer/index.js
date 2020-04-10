import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import './GroupMemberList.css'


class GroupMemberListContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: true
		}
	}

	componentDidMount() {
		this.getMembers()
	}

	// close modal
	close = () => {
		this.props.switcher()
	}

	getMembers = () => {
		console.log("trying to get members");
	}

	render() {

		return(
			<Modal size="mini" open={this.state.open} onClose={this.close}>
				<div className="member-list">
					<h3>GroupMemberListContainer</h3>
					
				</div>
			</Modal>
			)

	}
}




export default GroupMemberListContainer