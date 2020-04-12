import React from 'react'
import { Segment, Image } from 'semantic-ui-react'



function VideoListContainer(props) {
	
	// loop through the list
	const videos = props.videos.map((video) => {

		// we will return the list of videos found with 
		// the titles and a picture of the video
		// when the user click the picture, we will send the video id through props
		return(
			<Segment key={video.id}>
				<div className="video-image">
					<Image 
						src={video.snippet.thumbnails.standard.url}
						onClick={()=> props.getVideoToPlay(video)}
					/>
					
				</div>
				<h1>{video.snippet.title}</h1>

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