import React, {useState} from "react";
import axios from "axios";

import MediaBrief from "../Media/MediaBrief";
import "../../css/Home.css"

const BASE_URL = "https://imdb-api.com/en/API/Search/k_cecld4h6";
const noImage = "https://imdb-api.com/images/original/nopicture.jpg";

function Home() {
    const [mediaBrief, setMediaBrief] = useState([]);
    const [formValue, setFormValue] = useState("");

    function handleChange(evt){
        const {value} = evt.target;
        setFormValue(value);
    }

    async function handleSubmit(evt){
        evt.preventDefault();

        if (formValue.trim() !== ""){
            let result = await axios.get(`${BASE_URL}/${formValue}`);
            let allResults = result.data.results;
            let validResults = allResults.filter((item) => item.image !== noImage);
            setMediaBrief(validResults);
        } else {
            setMediaBrief([]);
        }
    }

    return (
        <div className="home-div">
            <h1>Hello! Welcome to Midas Movies!</h1>

            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="search-input">Enter the name of a movie or tv show: </label>
                    <input onChange={handleChange}id="search-input" placeholder="Example: 'Infinity War'" value={formValue}></input>
                    <button>Search</button>
                </form>
            </div>

            <div>
                <ol>
                    {mediaBrief.map((media, index) => {
                        return (
                            <li key={index}>
                                <MediaBrief id={media.id} image={media.image} title={media.title} description={media.description}/>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}

export default Home;
