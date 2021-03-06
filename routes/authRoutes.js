"use strict";

const express = require("express");
const jsonschema = require("jsonschema");

const User = require("../models/user");
const {createToken} = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userCreateSchema = require("../schemas/userCreate.json");
const {BadRequestError} = require("../expressError");

const router = new express.Router();

router.post("/login-token", async function (req, res, next) {
  try {
        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const {username, password} = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({token});
    } catch (err) {
        return next(err);
    }
});

router.post("/register", async function (req, res, next) {
  try {
        const validator = jsonschema.validate(req.body, userCreateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const newUser = await User.create({...req.body, is_admin: false});
        const token = createToken(newUser);
        return res.status(201).json({token});
  } catch (err) {
      return next(err);
    }
});

module.exports = router;
