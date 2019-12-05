import React, {Component} from 'react'
import axios from 'axios'

class Episode extends Component {
    constructor(){
        super()
        this.state={
            episodeList:[],
            podcastId: ""
        }
    }

    componentDidMount(){
        
        this.setState({
            podcastId: this.props.match.params.id
        })

        axios({
            url:`https://listen-api.listennotes.com/api/v2/podcasts/${this.props.match.params.id}`,
            method: `GET`,
            headers:{'X-ListenAPI-Key':'f1e31e292af446549bfbfebe744dd3ce'},
            dataResponse: `json`
        }).then((data)=>{
            console.log("episodes results", data.data.episodes[1])

            // console.log("episodes results", data.data.episodes.title)

            // console.log("episodes results", data.data.episodes.audio_length_sec)

            const newEpisodes = []

            data.data.episodes.forEach((element, index)=>{

                if(index < 10){
                    newEpisodes.push(element)

                    this.setState({
                        episodeList: newEpisodes
                    })
                }
            })
        })
    }

    render(){
        return(
            <section>
                {this.state.episodeList.map((episode)=>{
                        return(
                            <li key={episode.id}>
                                <img src={episode.thumbnail} alt={episode.title}/>
                                <h2>{episode.title}</h2>
                                <p>Audio Length: {episode.audio_length_sec} seconds</p>
                            </li>
                        )
                    })}
            </section>
        )
    }
}

export default Episode