import React, {useState, useEffect, useContext } from "react";
import CountContext from "../countContext";
import MidasApi from "../api";

function MediaBrief({id="tt4154756", image, title="Avengers Infintiy War", description="Avengers movie"}) {
    const {token, currentUser, setCurrentUser} = useContext(CountContext);
    const [mediaLiked, setMediaLiked] = useState(false);

    useEffect(() => {
        async function checkIfLiked(){
            setMediaLiked(currentUser.favoriteMediaIds.includes(id));
        }

        if (currentUser){
            checkIfLiked();
        }
    }, [currentUser, id]);

    async function handleClick(evt){
        MidasApi.token = token;

        if (mediaLiked) {
            let modifiedUser = currentUser;
            let arr = currentUser.favoriteMediaIds.filter((item) => item !== id);
            modifiedUser.favoriteMediaIds = arr;
            setCurrentUser(modifiedUser);
            MidasApi.removeFavorite({username: currentUser.username, media_id:id});
        } else {
            console.log("NOT LIKED. CURRENT USER:", currentUser)
            let modifiedUser = currentUser;
            let arr = currentUser.favoriteMediaIds
            arr.push(id);
            modifiedUser.favoriteMediaIds = arr;
            console.log("MODIFIED USER: ", modifiedUser);
            setCurrentUser(modifiedUser);
            MidasApi.createFavorite({username: currentUser.username, media_id:id});
        }
        
        setMediaLiked(!mediaLiked);
    }

    return (
        <div className="media-brief">
            <img src={`${image}`} alt="Movie Poster" style={{width:"100px", height:"100px"}}></img>
            <a href={`https://www.imdb.com/title/${id}/`} target="_blank" rel="noopener noreferrer">
                <h1>{title}</h1>
            </a>
            <p>Description: {description}</p>

            {currentUser ? <button onClick={handleClick}>{mediaLiked ? "UNLIKE":"LIKE"}</button> : null}

            <hr/>
        </div>
    );
}

export default MediaBrief;
