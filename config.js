"use strict";

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;
const apiKey = "k_cecld4h6";

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test") ? "midas_test" : process.env.DATABASE_URL || "midas";
}

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("----------------------------------------------------------------------------");

module.exports = {SECRET_KEY, PORT, BCRYPT_WORK_FACTOR, apiKey, getDatabaseUri};
