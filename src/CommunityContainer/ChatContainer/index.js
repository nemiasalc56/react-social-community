import React, { Component } from 'react'


class ChatContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			members: []
		}
	}






	render() {

		return(
			<div>Chatting with the group named {this.props.groupToChat.name}</div>
			)
	}
}




export default ChatContainer