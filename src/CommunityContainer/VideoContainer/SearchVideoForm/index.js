import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'



class SearchVideoForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			search: ''
		}
	}

	// allow the user to type on the form
	handleChange = (e) => {
		this.setState({search: e.target.value})
	}

	// submit search
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.getVideoIds(this.state.search)
	}


	render() {
		return(
			<div>
				SearchVideoForm
				<Form onSubmit={this.handleSubmit}>

					<Form.Input 
						type="text" 
						value={this.state.search} 
						onChange={this.handleChange}
						placeholder="Search..."
					/>

					<Button type="submit">Search</Button>
				</Form>
			</div>
			)
	}
}



export default SearchVideoForm