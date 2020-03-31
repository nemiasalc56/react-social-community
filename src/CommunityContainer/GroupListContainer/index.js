import React from 'react'
import { Segment, Dropdown } from 'semantic-ui-react'
import './GroupList.css'



function GroupListContainer(props) {

	

	const groups = props.groups.map((group) => {
		console.log(group.name);

		return(
			<Segment style={{margin: "5px"}} key={group.id}>
				<div className="setting">
					<Dropdown text='Settings'>
					    <Dropdown.Menu>
					      <Dropdown.Item text='Update' onClick={()=> console.log(group.id)}/>
					      <Dropdown.Item text='Delete' />
					      <Dropdown.Item text='Add member' />
					    </Dropdown.Menu>
					  </Dropdown>
				</div>
				<h3>
					{group.name}
				</h3>
			</Segment>
				
			
			)
	})


	return(
		<div className="group-list">
			{groups}
		</div>
		)
}



export default GroupListContainer