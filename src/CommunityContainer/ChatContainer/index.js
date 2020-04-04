import React, { Component } from 'react'
import NewMessageForm from './NewMessageForm'
import './ChatContainer.css'
import MessageListContainer from './MessageListContainer'


class ChatContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			messages: this.props.messages
		}
	}

	// send message method
	sendMessage = async (message) => {
		console.log("sendMessage method: user is trying to send message");
		console.log(message);

		// define the url
		const url = process.env.REACT_APP_API_URL + '/api/v1/messages/' + this.props.groupToChat.id

		console.log(this.props.groupToChat);
		try {
			// fetch call that will send the message
			const sendMessageResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(message),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const sendMessageJson = await sendMessageResponse.json()
			console.log(sendMessageJson);

			// if succesfully send message added in state
			if(sendMessageJson.status === 200) {
				const messages = this.state.messages
				messages.push(sendMessageJson.data)
				this.setState({messages: messages})
			}

		} catch(err) {
			console.error(err);
		}
	}



	render() {

		return(
			<div>
				<h4>Chatting with the group named {this.props.groupToChat.name}</h4>
				<div className="message-container">
					<MessageListContainer messages={this.state.messages}/>
				</div>
				
				<div className="new-message-form">
					<NewMessageForm sendMessage={this.sendMessage} />
				</div>
			</div>
			)
	}
}




export default ChatContainer