"use strict";

const axios = require("axios");
const express = require("express");
const router = new express.Router();

const {apiKey} = require("../config");
const BASE_URL = `https://imdb-api.com/en/API/Search/${apiKey}`;

router.post("/search-media", async function (req, res, next) {
    try {
        const {title} = req.body;
        let result = await axios.get(`${BASE_URL}/${title}`);
        let data = result.data.results;
        return res.json({data});
    } catch (err) {
      return next(err);
    }
});

module.exports = router;
