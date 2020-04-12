import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import './VideoList.css'



function VideoListContainer(props) {
	
	// loop through the list
	const videos = props.videos.map((video) => {

		// we will return the list of videos found with 
		// the titles and a picture of the video
		// when the user click the picture, we will send the video id through props
		return(
			<Segment key={video.id}>

				<div className="video-list">
					
					<div className="video-image">
						<Image 
							src={video.snippet.thumbnails.default.url}
							onClick={()=> props.getVideoToPlay(video)}
						/>
					</div>
					<h2 className="title">{video.snippet.title}</h2>
					
				</div>

			</Segment>
			)
	})


	return(
		<div>
			{videos}
		</div>
		)
}




export default VideoListContainer