import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import SearchVideoForm from './SearchVideoForm'
import VideoListContainer from './VideoListContainer'



class VideoContainer extends Component {
	constructor() {
		super()

		this.state = {
			videos: [] 
		}
	}


	// method that will get the videos to play
	getVideoIds = async (name) => {
		// define our url
		const url = `https://www.googleapis.com/youtube/v3/search?part=id&q=${name}&type=video&key=` + process.env.REACT_APP_YOUTUBE_API_KEY

		try {

			// fetch call
			const videosResponse = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const videosJson = await videosResponse.json()

			// we are storing the items that have the video id
			let videoIds = ""

			for(let i = 0; i < videosJson.items.length; i++) {
				videoIds += `${videosJson.items[i].id.videoId}` + "%"
			}

			// console.log("videoIds >>> ", videoIds);
			
			this.getVideosInfo(videoIds)

		} catch(err) {
			console.error(err);
		}
	}

	// get video info with the video ids found
	getVideosInfo = (videoIds) => {
		console.log("this is getVideoIds >> ", videoIds);
	}


	render() {

		return(
			<div>
				<SearchVideoForm getVideoIds={this.getVideoIds}/>

				<VideoListContainer />
			</div>
			)
	}
}



export default VideoContainer