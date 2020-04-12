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
				// doing this because on the getVideosInfo method we can 
				// use only one or two videos id
				this.getVideosInfo(videosJson.items[i].id.videoId)
			}


		} catch(err) {
			console.error(err);
		}
	}

	// get video info with the video ids found
	getVideosInfo = async (videoIds) => {
		console.log("this is getVideoIds >> ", videoIds);
		// define our youtube url
		const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`

		try {

			const videosInfoResponse = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const videosInfoJson = await videosInfoResponse.json()

			console.log("getting the response from getVideosInfo");
			console.log(videosInfoJson.items[0]);
			const videos = this.state.videos

			videos.push(videosInfoJson.items[0])

			this.setState({videos: videos})

		} catch(err) {
			console.error(err);
		}
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