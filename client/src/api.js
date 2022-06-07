import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const BASE_URL = process.env.NODE_ENV === "production" ? "https://midas-movies-olaiya.herokuapp.com" : process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class MidasApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.log("BASE_URL: ", BASE_URL);
        console.debug("API Call:", endpoint, data, method);
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${MidasApi.token}`};
        const params = (method === "get") ? data : {};

        try {
            let result = await axios({url, method, data, params, headers });
            return result.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }
    
    // Auth
    // Auth - Used
    static async login(data) {
        let result = await this.request(`auth/login-token`, data, "post");
        return result.token;
    }

    static async register(data) {
        let result = await this.request(`auth/register`, data, "post");
        return result.token;
    }

    // Media
    // Media - Used
    static async getMedia(id) {
        let result = await this.request(`media/${id}`);
        return result;
    }

    static async createMedia(data) {
        let result = await this.request(`media/`, data, "post");
        return result;
    }

    static async removeMedia(id) {
        let result = await this.request(`media/${id}`, {id}, "delete");
        return result;
    }

    // User
    // User - Used
    static async getUser(username) {
        let result = await this.request(`users/${username}`);
        return result.user;
    }

    static async getUserFavorites(username){
        let result = await this.request(`favorites/users/${username}`);
        return result.favorites;
    }

    // User - Unused
    static async updateUser(username, data) {
        let result = await this.request(`users/${username}`, data, "patch");
        return result.user;
    }

    static async removeUser(username) {
        let result = await this.request(`users/${username}`, {}, "delete");
        return result;
    }

    // Favorites - Used
    static async createFavorite(data) {
        let result = await this.request(`favorites`, data, "post");
        // Returns - id, username, media_id
        return result.favorite;
    }

    static async removeFavorite(data) {
        let result = await this.request(`favorites`, data, "delete");
        return result;
    }

    // Favorites - Unused
    static async getFavorite(id) {
        let result = await this.request(`favorites/${id}`);
        return result;
    }

    static async getUserFavoriteMediaIds(username) {
        let result = await this.request(`favorites/ids/${username}`);
        return result;
    }
}

export default MidasApi;
