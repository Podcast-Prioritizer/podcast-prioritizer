import React, {Component} from 'react'
import axios from 'axios'
import "./styles/App.scss";
// SWEET ALERTS
import Swal from "sweetalert2";



class Podcast extends Component{
    constructor(){
        super();
        this.state = {
            podcastList: [], 
            userInput: "",
            episodeList: [],
        };
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
            this.setState({
                podcastList: data.data.results
            })  
            
            if (this.state.podcastList.length === 0) {
            Swal.fire({
                title: "Uh-oh!",
                text:
                  "Looks like we don't have any podcasts that match your criteria (you must be super picky!).  Please try again and broaden your horizons.",
                imageUrl: require("./styles/assets/nounAngry.png"),
                imageWidth: 100,
                confirmButtonText: "Let me try again",
                padding: "2rem"
              });
            }
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

                } ;
            });
        });
    }

    closeEpisodeList = () => {
        this.setState({
            episodeList: ""
        });
    };

    totalTime = (seconds)=>{
        const hours = Math.floor(seconds/3600);
        const minutes = Math.round((seconds %= 3600)/60);
        if(hours > 0){
            return `${hours} h ${minutes} min`
        }else{
            return `${minutes} min`
        }
    };

    showMore = (e, index) =>{
        document.getElementById(`PodcastCard__description--${index}`).classList.toggle("PodcastCard__description--snippet")

        if(e.target.innerHTML === "... Show more"){
            e.target.innerHTML = "... Show less"
        }else{
            e.target.innerHTML = "... Show more"
        };
    };

    selectEpisode = (selectedEpisodeId, index) => {
        let podcastLength = this.state.episodeList[index]["audio_length_sec"];

        this.state.episodeList.map((episode) => {
            if (episode.id === selectedEpisodeId) {
                this.props.setPodcastTime(podcastLength);
                this.props.selectedEpisodeProp(this.state.episodeList[index]);
            };
        });
    };

    //episode details
    showDetails = (e, index) => {
        document.getElementById(`EpisodeCard__description--${index}`).classList.remove("visuallyHidden")
        document.getElementById(`EpisodeCard__description--${index}`).setAttribute("open", true)
    }

    closeDialog= (e, index) => {
        document.getElementById(`EpisodeCard__description--${index}`).classList.add("visuallyHidden")
        document.getElementById(`EpisodeCard__description--${index}`).setAttribute("open", false)
    }

    render() {
        
        return (
        <section className="PodcastSearch">
            <div className="wrapper">
                <div className="PodcastSearch__introContent">
                <h2>Pick your Podcast</h2>
                <p>
                    Find an episode of a podcast to keep you entertained on your commute.
                </p>
            </div>

            <form onSubmit={this.handleSubmit} className="PodcastSearch__form">
                <input
                    type="text"
                    placeholder="Search podcast"
                    onChange={this.handleChange}
                    value={this.state.userInput}
                    className="PodcastSearch__textInput"
                />

                <button
                    type="submit"
                    onSubmit={this.handleSubmit}
                    className="PodcastSearch__submitButton"
                    onClick={this.closeEpisodeList}
                >
                    Submit
                </button>
            </form>

            <section className="PodcastResults">
                {this.state.episodeList.length ? (
                <button
                    className="PodcastResults__button--back"
                    onClick={this.closeEpisodeList}
                >
                    <span className="visuallyHidden">
                        Click here to go back
                    </span>
                    <i className="fas fa-arrow-left" title="Go back"></i>
                </button>
                ) : null}

                <ul className="PodcastResults__list">
                    {!this.state.episodeList.length
                        ? this.state.podcastList.map((podcast, index) => {
                            return (
                            <li className="PodcastResults__item" key={podcast.id}>
                                <div>
                                    <img
                                        src={podcast.thumbnail}
                                        alt={podcast.title_original}
                                        className="PodcastCard__image"
                                        id={podcast.id}
                                        onClick={this.getRecentEpisodes}
                                        />
                                    <button
                                        id={podcast.id}
                                        onClick={this.getRecentEpisodes}
                                        className="PodcastCard__button"
                                        >
                                        Episodes
                                    </button>
                                </div>
                                <div className="PodcastCard__text">
                                    <h2 className="PodcastCard__title">
                                        {podcast.title_original.split("|")[0]}
                                    </h2>
                                    <p
                                    className="PodcastCard__description PodcastCard__description--snippet"
                                    id={`PodcastCard__description--${index}`}
                                    >
                                    {podcast.description_original}
                                    </p>
        
                                    {
                                    (podcast.description_original.length > 450)
                                    ?
                                    <button 
                                        className="PodcastCard__button--showMore"
                                        onClick={(e)=>{this.showMore(e, index)}}>
                                        ... Show more
                                    </button>
                                    : null
                                    }
                                </div>
                            </li>
                            );
                        })
                    : this.state.episodeList.map((episode, index) => {  
                        return (
                        <li
                            key={episode.id}
                            className="EpisodeResults__item"
                            ref="singleEpisode"
                        >
                            <img
                                src={episode.thumbnail}
                                alt={episode.title}
                                className="PodcastCard__image"
                            />
                            <div>
                                <h2 className="PodcastCard__title">
                                {episode.title}
                                </h2>
                                <dialog
                                className="visuallyHidden"
                                id={`EpisodeCard__description--${index}`}
                                >
                                    <div className="EpisodeCard__titleBar">
                                        <p>{episode.title}</p>
                                        <button
                                        className="EpisodeCard__closeDialog"
                                        onClick={e => {
                                            this.closeDialog(e, index);
                                        }}
                                    >
                                        x
                                        </button>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                        __html: episode.description
                                        }}
                                        className="EpisodeCard__description"
                                    />
                                </dialog>
                                <div className="EpisodeCard__options">
                                    <div className="EpisodeCard__options--container">
                                        <button
                                        className="EpisodeCard__options--listen"
                                        onClick={() => this.selectEpisode(episode.id, index)}
                                        >
                                        <i className="fas fa-headphones-alt"></i> Listen
                                        </button>
                                        <p className="EpisodeCard__options--audioLength">
                                        {this.totalTime(episode.audio_length_sec)}
                                        </p>
                                    </div>
                                    <button
                                    className="EpisodeCard__options--details"
                                    onClick={e => {
                                        this.showDetails(e, index);
                                    }}
                                    >
                                    Details
                                    </button>
                                </div>
                            </div>
                        </li>
                        );
                    })}
                </ul>
            </section>
        </div>
        </section>
        );
    }
}

export default Podcast