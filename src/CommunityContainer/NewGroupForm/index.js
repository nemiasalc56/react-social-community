import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import './NewGroupForm.css'



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
		this.clearForm()
	}

	// clear the form after creating a group
	clearForm = () => {
		this.setState({name: ''})
	}


	render() {

		return(
			<div>
				<Form onSubmit={this.handleSubmit}>

					<Form.Input
						placeholder="Group Name"
						type="text"
						value={this.state.name}
						onChange={this.handleChange}
						name="name" />

					<Button color="green" style={{width: "100%"}}>Add Group</Button>
				</Form>
			</div>
			)
	}
}


export default NewGroupForm