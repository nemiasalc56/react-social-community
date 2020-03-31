import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'



class NewGroupForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: ''
		}
	} 

	// handle change
	handleChange = (e) => {
		this.setState({name: e.target.value})
	}

	// handle the submits
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.newGroup(this.state)
	}


	render() {

		return(
			<div>
				<Form onSubmit={this.handleSubmit}>

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