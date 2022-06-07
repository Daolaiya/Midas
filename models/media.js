"use strict";

const axios = require("axios");

const db = require("../database/db");
const {BadRequestError, NotFoundError} = require("../expressError");
const {apiKey} = require("../config");

const BASE_URL = `https://imdb-api.com/en/API/Title/${apiKey}`;

class Media {
    static async create(id, title, type, cast_list, description) {
        const duplicateCheck = await db.query(`SELECT * FROM media WHERE id = $1`, [id]);
        if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate media with id: ${id}`);
        const result = await db.query(
            `INSERT INTO media (id, title, type, cast_list, description)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, title, type, cast_list, description`, 
            [id, title, type, cast_list, description]
        );
        const media = result.rows[0];
        return media;
    }

    static async createFromMediaId(id) {
        const duplicateCheck = await db.query(`SELECT * FROM media WHERE id = $1`, [id]);
        if (duplicateCheck.rows[0]) return;
        const apiResult = await axios.get(`${BASE_URL}/${id}`);
        const title = apiResult.data.title;
        const type = apiResult.data.type === "Movie" ? "movie" : "show";
        const cast_list = apiResult.data.actorList.map((item) => item.name).join(", ");
        const description = apiResult.data.plot;
        const result = await db.query(
            `INSERT INTO media (id, title, type, cast_list, description)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, title, type, cast_list, description`, 
            [id, title, type, cast_list, description]
        );
        const media = result.rows[0];
        return media;
    }

    static async get(id) {
        const result = await db.query(`SELECT id, title, type, cast_list, description FROM media WHERE id = $1`, [id]);
        const media = result.rows[0];
        if (!media) throw new NotFoundError(`No media: ${id}`);
        return media;
    }

    static async delete(id) {
        const result = await db.query(`DELETE FROM media WHERE id = $1 RETURNING id`, [id]);
        const media = result.rows[0];
        if (!media) throw new NotFoundError(`No media: ${id}`);
    }
}

module.exports = Media;
