import React, { Component } from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'



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
		this.clear()
	}

	// clear form after search
	clear = () => {
		this.setState({search: ''})
	}


	render() {
		return(
			<div>
				<Form onSubmit={this.handleSubmit}>
					<div className="search-container">
						<Form.Input 
							type="text"
							style={{width: "55vw"}}
							value={this.state.search} 
							onChange={this.handleChange}
							placeholder="Search..."
						/>

						<button 
							className="ui button" 
							type="submit" 
							style={{height: "38px"}}> 
							<Icon name="search"/>
						</button>
						
					</div>
				</Form>
			</div>
			)
	}
}



export default SearchVideoForm