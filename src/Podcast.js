import React, {Component} from 'react'
import axios from 'axios'
import './App.css';
import {BrowserRouter as Link} from 'react-router-dom'


class Podcast extends Component{
    constructor(){
        super();
        this.state = {
            podcastList: [], 
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

    render(){
        return(
            <section>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Search podcast" onChange={this.handleChange} value={this.state.userInput}/>
                    <input type="submit" onSubmit={this.handleSubmit}/>
                </form>
                <form>
                    {this.state.podcastList.map((podcast)=>{
                        return(
                            <li key={podcast.id}>
                                <Link to={`/${podcast.id}`}>
                                    <img src={podcast.thumbnail} alt={podcast.title_original}/>
                                    <h2>{podcast.title_original}</h2>
                                    <p>{podcast.description_original}</p>
                                </Link>
                            </li>
                        )
                    })}
                </form>
            </section>
        )
    }
}

export default Podcast