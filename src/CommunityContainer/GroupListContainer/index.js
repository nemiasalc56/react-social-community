import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import './GroupList.css'



function GroupListContainer(props) {

	

	const groups = props.groups.map((group) => {
		console.log(group.name);

		return(
			<Segment style={{margin: "5px"}} key={group.id}>
				<div className="setting">
					<Icon link name='setting'
						onClick={() => console.log("helllo")}
					 />
				</div>
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