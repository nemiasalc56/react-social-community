import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'



class NewGroupForm extends Component {
	constructor() {
		super()

		this.state = {
			name: ''
		}
	} 

	// handle change
	handleChange = (e) => {
		this.setState({name: e.target.value})
	}



	render() {

		return(
			<div>
				<Form>

					<Form.Input
						label="Group Name:"
						type="text"
						value={this.state.name} 
						onChange={this.handleChange}
						name="name" />

					<Button>Create Group</Button>
				</Form>
			</div>
			)
	}
}


export default NewGroupForm