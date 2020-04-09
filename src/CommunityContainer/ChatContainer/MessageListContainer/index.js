import React from 'react'



function MessageListContainer(props) {

	// console.log("messages in MessageListContainer: ");
	// console.log(props.messages);
	// console.log(props);

	// loop through the messages to show the list
	const messages = props.messages.map((message)=> {
		// console.log(props.user.id);

		if(props.user.id === message.owner_fk.id) {
			// console.log(message.owner_fk.id);
			return(
				<p key={message.id} className="my-message">{message.message}</p>
				)

		} else {
			return(
				<p key={message.id} className="other-message">{message.message}</p>
				)
		}
	})

	return(
		<div className="message-list">
			{messages}
		</div>
		)
}



export default MessageListContainer