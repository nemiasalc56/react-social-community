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


	render() {
		return(
			<div>
				SearchVideoForm
				<Form>

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