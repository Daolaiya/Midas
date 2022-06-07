"use strict";

// Convenience middleware to handle common auth cases in routes.

const jwt = require("jsonwebtoken");

const {SECRET_KEY} = require("../config");
const {UnauthorizedError} = require("../expressError");

function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (err) {
        return next();
    }
}

function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}

function ensureAdmin(req, res, next) {
    try {
        if (!res.locals.user || !res.locals.user.is_admin) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

function ensureCorrectUserOrAdmin(req, res, next) {
    try {
        const user = res.locals.user;
        if (!(user && (user.is_admin || user.username === req.params.username))) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}

function test(req, res, next){
    console.log("1 REQ: ", "\n", Object.keys(req), "RES: ", "\n", Object.keys(res));
    req.testVar = 5;
    res.testVar = 10;
    console.log("2 REQ: ", "\n", Object.keys(req), "RES: ", "\n", Object.keys(res));
    return next();
}

module.exports = {authenticateJWT, ensureLoggedIn, ensureAdmin, ensureCorrectUserOrAdmin, test};
