import React, { Component } from 'react'
import NewMessageForm from './NewMessageForm'
import './ChatContainer.css'


class ChatContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			messages: []
		}
	}



	// send message method
	sendMessage = (message) => {
		console.log("sendMessage method: user is trying to send message");
		console.log(message);
	}


	render() {

		return(
			<div>
				<h4>Chatting with the group named {this.props.groupToChat.name}</h4>
				<div className="message-container">
					
				</div>
				
				<div className="new-message-form">
					<NewMessageForm sendMessage={this.sendMessage} />
				</div>
			</div>
			)
	}
}




export default ChatContainer