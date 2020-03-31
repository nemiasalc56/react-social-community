import React from 'react'
import { Segment } from 'semantic-ui-react'




function GroupListContainer(props) {

	

	const groups = props.groups.map((group) => {
		console.log(group.name);

		return(
			<Segment style={{margin: "5px"}} key={group.id}>
				{group.name}
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