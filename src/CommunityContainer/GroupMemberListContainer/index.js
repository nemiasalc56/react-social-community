import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'


class GroupMemberListContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: true
		}
	}


	// close modal
	close = () => {
		this.props.switcher()
	}

	render() {

		return(
			<Modal open={this.state.open} onClose={this.close}>
				<h3>GroupMemberListContainer</h3>
			</Modal>
			)

	}
}




export default GroupMemberListContainer