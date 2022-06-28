import React, {useState, useContext} from "react";

import MidasApi from "../../api";
import CountContext from "../../countContext";

function MediaDetailed({id="tt4154756", title="Avengers Infintiy War", type="movie", cast_list="Robert Downey, Mark Ruffalo, Chris Evans", description="Avengers movie"}) {
    const [favorite, setFavorite] = useState(false);
    const {token, currentUser, setCurrentUser} = useContext(CountContext);

    async function remove(id){
        setFavorite(true);
        MidasApi.token = token;
        await MidasApi.removeFavorite({username:currentUser.username, media_id:id});
        currentUser.favoriteMediaIds = currentUser.favoriteMediaIds.filter((item) => item !== id);
        setCurrentUser(currentUser);
        
    }

    return (
      <li hidden={favorite}>
          <div className="media-detailed">
                <a href={`https://www.imdb.com/title/${id}/`}>
                    <h1>{title}</h1>
                </a>
                <h4>Media: {type === "movie" ? "Movie":"Show"}</h4>
                <h3>Cast list: {cast_list}</h3>
                <p>Description: {description}</p>
                <button onClick={() => remove(id)}>UNLIKE</button>
          </div>
      </li>
    );
}

export default MediaDetailed;
