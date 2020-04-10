import React from 'react'
import { Segment, Dropdown } from 'semantic-ui-react'
import './GroupList.css'



function GroupListContainer(props) {


	const groups = props.groups.map((group) => {

		return(
			<Segment onClick={()=> props.getGroupToChat(group)} style={{
				margin: "5px",
				width: "135px"
				}} key={group.id}>

				{props.user.id === group.owner_fk.id?
					<div className="setting">
						<Dropdown text='Settings'>
						    <Dropdown.Menu>
						    	<Dropdown.Item text='Members' onClick={()=> props.getGroupMemberId(group.id)}/>
								<Dropdown.Item text='Update' onClick={()=> props.groupToUpdate(group.id)}/>
								<Dropdown.Item text='Add member' onClick={()=> props.getGroupId(group.id)} />
								<Dropdown.Item text='Delete' onClick={()=> props.deleteGroup(group.id)} />
						    </Dropdown.Menu>
						  </Dropdown>
					</div>

					
					:null
				}
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