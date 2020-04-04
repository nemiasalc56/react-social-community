import React from 'react'



function MessageListContainer(props) {

	console.log("messages in MessageListContainer: ");
	console.log(props.messages);

	// loop through the messages to show the list
	const messages = props.messages.map((message)=> {

		return(
			<p>{message.message}</p>
			)
	})

	return(
		<div>
			<h3>MessageListContainer</h3>
			{messages}
		</div>
		)
}



export default MessageListContainer