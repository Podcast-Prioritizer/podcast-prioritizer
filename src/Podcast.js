import React, {Component} from 'react'
import axios from 'axios'
import './App.css';


class Podcast extends Component{
    constructor(){
        super();
        this.state = {
            podcastList: [],
            episodeList:[],
            podcastId:"", 
            userInput: ""
        }
    }

    componentDidMount(){

    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        axios({
            url:`https://listen-api.listennotes.com/api/v2/search`,
            method: `GET`,
            headers:{'X-ListenAPI-Key':'f1e31e292af446549bfbfebe744dd3ce'},
            dataResponse: `jsonp`,
            params:{
                q: this.state.userInput,
                type: "podcast"
            }
        }).then((data)=>{
            console.log("podcast results", data.data.results)
            this.setState({
                podcastList: data.data.results
            })
        })
    }

    handleChange = (event) =>{
        this.setState({
            userInput: event.target.value
        })
    }

    //WARNING EACH PODCAST HAS OVER 100 EPISODES!!!!
    // getEpisodes= (event) =>{
    //     console.log('help', event.target.id)

    //     this.setState({
    //         podcastId: event.target.id
    //     })
    //     axios({
    //         url:`https://listen-api.listennotes.com/api/v2/podcasts/${event.target.id}`,
    //         method: `GET`,
    //         headers:{'X-ListenAPI-Key':'f1e31e292af446549bfbfebe744dd3ce'},
    //         dataResponse: `json`
    //     }).then((data)=>{
    //         // console.log("episodes results", data.data.episodes)

    //         console.log("episodes results", data.data.episodes.title)

    //         // console.log("episodes results", data.data.episodes.audio_length_sec)
    //         this.setState({
    //             episodeList: data.data.episodes
    //         })
    //     })
    // }

    render(){
        return(
            <section>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Search podcast" onChange={this.handleChange} value={this.state.userInput}/>
                    <input type="submit" onSubmit={this.handleSubmit}/>
                </form>
                <form onChange={this.getEpisodes}>
                    {this.state.podcastList.map((podcast)=>{
                        return(
                            <li key={podcast.id} onClick={this.getEpisodes}>
                                <input type = "radio" name="podcast" id={podcast.id}/>
                                <label htmlFor={podcast.id}>
                                    <img src={podcast.thumbnail} alt={podcast.title_original}/>
                                </label>
                                <h2>{podcast.title_original}</h2>
                                <p>{podcast.description_original}</p>
                            </li>
                        )
                    })}
                </form>
            </section>
        )
    }
}

export default Podcast