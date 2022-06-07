"use strict";

const express = require("express");
const jsonschema = require("jsonschema");

const Favorite = require("../models/favorite");
const Media = require("../models/media");
const favoriteCreateSchema = require("../schemas/favoriteCreate.json");
const {BadRequestError} = require("../expressError");
const {ensureLoggedIn, ensureAdmin, ensureCorrectUserOrAdmin} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, favoriteCreateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const media = await Media.createFromMediaId(req.body.media_id);
        // console.log("MEDIA: ", media);
        const favorite = await Favorite.create(req.body.username, req.body.media_id);
        // console.log("FAVORITE: ", favorite);
        // Returns - id, username, media_id
        return res.status(201).json({favorite});
    } catch (err) {
        return next(err);
    }
});

router.get("/users/:username", ensureCorrectUserOrAdmin,async function (req, res, next) {
    try {
        const favorites = await Favorite.findUserFavorites(req.params.username);
        return res.json({favorites});
    } catch (err) {
        return next(err);
    }
});

router.delete("/", ensureAdmin, async function (req, res, next) {
  try {
        await Favorite.delete(req.body.username, req.body.media_id);
        return res.json({deleted: `User: ${req.body.username}, Media id: ${req.body.media_id}`});
    } catch (err) {
        return next(err);
    }
});

router.get("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
        const favorites = await Favorite.get(req.params.id);
        return res.json({favorites});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
