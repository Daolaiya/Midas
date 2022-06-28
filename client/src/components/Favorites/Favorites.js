import React, {useContext, useEffect, useState} from "react";
import {v4 as uuid} from 'uuid';

import MidasApi from "../../api";
import CountContext from "../../countContext";
import MediaDetailed from "../Media/MediaDetailed";

function Favorites(){
    const {currentUser, token} = useContext(CountContext);
    const [media, setMedia] = useState([]);
    const [favorites, setFavorites] = useState(false);
    
    useEffect(() => {
        async function getFavorites(){
            MidasApi.token = token;
            let results = await MidasApi.getUserFavorites(currentUser.username);
            if (results.length) {
                setFavorites(true);
                setMedia(results);
            }
        }

        if (currentUser) {
            getFavorites();
        }
    }, [currentUser, token]);

    return (
        <div>
            <h1>User Favorites</h1>
            {favorites ? null : <h3>Favorites will be shown here when added.</h3>}
            <ol>
                {
                    media.map((favorite) => {
                        return (
                            <MediaDetailed 
                                id={favorite.media_id} 
                                title={favorite.title} 
                                type={favorite.type} 
                                cast_list={favorite.cast_list} 
                                description={favorite.description}
                                key={uuid()}
                            />
                        );
                    })
                }
            </ol>
        </div>
    );
}

export default Favorites;
