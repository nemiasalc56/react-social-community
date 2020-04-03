import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'


class NewMessageForm extends Component {
	constructor() {
		super()

		this.state = {
			message: ''
		}
	}


	// handle the changes when user types
	handleChange = (e) => {
		this.setState({message: e.target.value})
	}

	render() {
		return(
			<div>
				<Form>
					
					<Form.Input 
						type="text"
						value={this.state.message}
						onChange={this.handleChange}
					/>
					<Button type="submit">Send</Button>
				</Form>
			</div>
			)
	}
}


export default NewMessageForm