"use strict";

const express = require("express");
const jsonschema = require("jsonschema");

const Media = require("../models/media");
const mediaCreateSchema = require("../schemas/mediaCreate.json");
const {BadRequestError} = require("../expressError");
const {ensureLoggedIn, ensureCorrectUserOrAdmin} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:media_id", ensureLoggedIn, async function (req, res, next) {
    try {
      const media = await Media.get(req.params.media_id);
      return res.json({media});
    } catch (err) {
      return next(err);
    }
});

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, mediaCreateSchema);
        if (!validator.valid) {
          const errs = validator.errors.map(e => e.stack);
          throw new BadRequestError(errs);
        }
        const {id, title, type, cast_list, description} = req.body
        const media = await Media.create(id, title, type, cast_list, description);
        return res.status(201).json({media});
    } catch (err) {
        return next(err);
    }
});

router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        await Media.delete(req.params.id);
        return res.json({deleted: req.params.id});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
