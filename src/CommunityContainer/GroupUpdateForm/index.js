import React, { Component } from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'



class GroupUpdateForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			open: true
		}
	}

	// close modal
	close = () =>{
		this.props.switcher()
	}


	render() {

		return(
			<div>
				<Modal size="mini" open={this.state.open} onClose={this.close}>
					<h3>GroupUpdateForm</h3>
					
					<Form>
						<Form.Input 
							label="Name"
							placeholder="Name"
						/>

						<Button type="submit">Update</Button>

					</Form>

				</Modal>


			</div>
			)
	}
}





export default GroupUpdateForm