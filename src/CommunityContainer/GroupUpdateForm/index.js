import React, { Component } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'



class GroupUpdateForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: true,
			name: ''
		}
	}

	componentDidMount() {
		this.setState({
			name: this.props.groupToEdit.name
		})
	}



	// close modal
	close = () =>{
		this.props.switcher()
	}

	// allow user to type in the form
	handleChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}

	// submit the changes
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.updateGroup(this.props.groupToEdit.id, this.state)
		this.close()
	}


	render() {

		return(
			<div>
				<Modal size="mini" open={this.state.open} onClose={this.close}>

					<div className="update-group-form" >
						<h3>Update Group</h3>
						
						<Form onSubmit={this.handleSubmit}>
							<Form.Input 
								label="Name"
								placeholder="Name"
								value={this.state.name}
								onChange={this.handleChange}
							/>

							<button
								style={{
									width: "100%",
									backgroundColor: "green"
									}}
								className="ui button" 
								type="submit">Update</button>

						</Form>
						

					</div>

				</Modal>


			</div>
			)
	}
}





export default GroupUpdateForm