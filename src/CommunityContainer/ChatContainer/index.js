import React, { Component } from 'react'
import NewMessageForm from './NewMessageForm'


class ChatContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			messages: []
		}
	}






	render() {

		return(
			<div>
				<h4>Chatting with the group named {this.props.groupToChat.name}</h4>
				
			</div>
			)
	}
}




export default ChatContainer