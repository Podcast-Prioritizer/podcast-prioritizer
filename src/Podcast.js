import React, {Component} from 'react'
import axios from 'axios'
import './App.css';

class Podcast extends Component{
    constructor(){
        super();
        this.state = {
            podcastList: [], 
            userInput: "",
            episodeList: []
        }
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

    // Queries the Listen Podcast API for the 10 most recent podcast episodes
    getRecentEpisodes = (e) => {
        const podcastID = e.target.id;

        axios({
            url: `https://listen-api.listennotes.com/api/v2/podcasts/${podcastID}`,
            method: `GET`,
            headers: { "X-ListenAPI-Key": "f1e31e292af446549bfbfebe744dd3ce" },
            dataResponse: `json`
        }).then(data => {
            const newEpisodes = [];

            data.data.episodes.forEach((element, index) => {
                if (index < 10) {
                newEpisodes.push(element);

                this.setState({
                    episodeList: newEpisodes
                });
                }
            });
        });
    }

    closeEpisodeList = () => {
        this.setState({
            episodeList: ""
        })
    }

    render(){
        return(
            <section className="Podcast">
                <form onSubmit={this.handleSubmit} className="PodcastSearch">

                    <input 
                        type="text" 
                        placeholder="Search podcast" 
                        onChange={this.handleChange} 
                        value={this.state.userInput}
                        className="PodcastSearch__textInput"/>

                    <input 
                        type="submit" 
                        onSubmit={this.handleSubmit}
                        className="PodcastSearch__submitButton"/>

                </form>

                <section className="PodcastResults">

                    {this.state.episodeList.length ? 

                        <button className="PodcastResults__button--back" onClick={this.closeEpisodeList}>Back</button>
                        
                        : null
                    }

                    <ul className="PodcastResults__list">

                        {!this.state.episodeList.length ?

                            this.state.podcastList.map((podcast)=>{
                                return(
                                    <li className="PodcastResults__item" key={podcast.id}>
                                        <img 
                                            src={podcast.thumbnail} 
                                            alt={podcast.title_original}
                                            className="PodcastCard__image"/>
                                        <h2 className="PodcastCard__title">{podcast.title_original}</h2>

                                        <p className="PodcastCard__description">{podcast.description_original}</p>

                                        <button 
                                            id={podcast.id} 
                                            onClick={this.getRecentEpisodes}
                                            className="PodcastCard__button">
                                            Episodes
                                        </button>
                                    </li>
                                )
                            })
                            
                            :

                            this.state.episodeList.map((episode) => {
                                return (
                                    <li key={episode.id} className="PodcastResults__item">
                                        <img 
                                            src={episode.thumbnail} 
                                            alt={episode.title}
                                            className="PodcastCard__image"/>
                                        <h2 className="PodcastCard__title">{episode.title}</h2>
                                        <p className="PodcastCard__description">Audio Length: {episode.audio_length_sec} seconds</p>
                                    </li>
                                )
                            })
                        
                        }   

                    </ul>
                </section>

            </section>
        )
    }
}

export default Podcast