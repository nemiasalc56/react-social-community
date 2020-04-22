import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'


class NewMessageForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			message: ''
		}
	}


	// handle the changes when user types
	handleChange = (e) => {
		this.setState({message: e.target.value})
	}

	// submit message
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.sendMessage(this.state)
		this.clearForm()
	}

	// clear the form after user submit
	clearForm = () => {
		this.setState({message: ''})
	}

	render() {
		return(
			<div>
				<Form onSubmit={this.handleSubmit}>
					
					<Form.Input
						type="text"
						value={this.state.message}
						onChange={this.handleChange}
					/>
					<Button  
						color="blue" 
						style={{
							width: "100%",
							border: "1px solid white"}} 
						type="submit">Send</Button>
				</Form>
			</div>
			)
	}
}


export default NewMessageForm