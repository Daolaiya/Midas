"use strict";

const db = require("../database/db");
const {BadRequestError, NotFoundError} = require("../expressError");

class Favorite {
    static async create(username, media_id) {
        const duplicateCheck = await db.query(`SELECT username, media_id FROM favorites WHERE username = $1 AND media_id = $2`, [username, media_id]);
        if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate favorite with id: ${media_id}`);
        const result = await db.query(
            `INSERT INTO favorites (username, media_id)
            VALUES ($1, $2)
            RETURNING id, username, media_id`, 
            [username, media_id]
        );
        const favorite = result.rows[0];
        return favorite; 
    }

    static async get(id) {
        const result = await db.query(`SELECT id, username, media_id WHERE id = $1`, [id]);
        const favorites = result.rows[0];
        if (!favorites) throw new NotFoundError(`No favorites: ${id}`);
        return favorites;
    }

    static async delete(username, media_id) {
        const result = await db.query(`DELETE FROM favorites WHERE username = $1 AND media_id = $2 RETURNING username, media_id`, [username, media_id]);
        const favorite = result.rows[0];
        if (!favorite) throw new NotFoundError(`No favorite with id: ${media_id}`);
    }

    static async findUserFavorites(username) {       
        let query = `SELECT media_id, title, type, cast_list, description FROM favorites JOIN media ON favorites.media_id = media.id WHERE favorites.username = '${username}'`;
        const results = await db.query(query);
        return results.rows;
    }
}

module.exports = Favorite;
