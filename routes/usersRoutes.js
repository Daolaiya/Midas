"use strict";

const express = require("express");
const jsonschema = require("jsonschema");

const User = require("../models/user");
const userUpdateSchema = require("../schemas/userUpdate.json");
const {ensureCorrectUserOrAdmin} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
        const user = await User.get(req.params.username);
        return res.json({user});
    } catch (err) {
        return next(err);
    }
});

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
        const validator = jsonschema.validate(req.body, userUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const user = await User.update(req.params.username, req.body);
        return res.json({user});
    } catch (err) {
        return next(err);
    }
});

router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
        await User.delete(req.params.username);
        return res.json({deleted: req.params.username});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
