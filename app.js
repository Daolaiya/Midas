"use strict";

// Express app for Midas App
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const {NotFoundError} = require("./expressError");
const {authenticateJWT, test} = require("./middleware/authMiddleware");
const mediaRoutes = require("./routes/mediaRoutes");
const usersRoutes = require("./routes/usersRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const authRoutes = require("./routes/authRoutes");
const imdbRoutes = require("./routes/imdbRoutes");

const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/users", usersRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/imdb", imdbRoutes);

if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/test", test, async function (req, res, next) {
    console.log("REQUEST BODY: ", req.body);
    // console.log("3 REQ: ", "\n", Object.keys(req), "RES: ", "\n", Object.keys(res));
    return res.json({result: 3});
});

// Handle 404 errors. This matches everything.
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

// Generic error handler. Anything unhandled goes here.
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: {message, status},
    });
});

module.exports = app;
